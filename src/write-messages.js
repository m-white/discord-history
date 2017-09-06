const request = require('request')
const fs = require('fs')

const filterText = require('./filter-text')

const startTime = new Date().toISOString().replace(/:/g, '-')

module.exports = async function writeMessages (authToken, channelId) {
  function appendMessageBatch (startMessageId) {
    return new Promise((resolve, reject) => {
      const options = {
        url: `https://discordapp.com/api/v6/channels/${channelId}/messages`,
        method: 'GET',
        headers: {
          authorization: authToken
        }
      }

      if (startMessageId) {
        options.qs = {
          before: startMessageId
        }
      }

      request(options, (err, response) => {
        if (err) {
          err.lastMessageAttempted = startMessageId
          reject(err)
        }

        const body = JSON.parse(response.body)

        body.forEach((message) => {
          const content = filterText(message.content)

          if (content) {
            fs.appendFileSync(`output/messages-${channelId}-${startTime}.txt`, `${content}\n`)
          }
        })

        let nextMessageId
        if (body[body.length - 1]) {
          nextMessageId = body[body.length - 1].id
        }

        resolve(nextMessageId)
      })
    })
  }

  try {
    let nextMessageId = await appendMessageBatch(null)
    console.log('Getting most recent history')
    while (nextMessageId) {
      console.log(`Getting messages before ${nextMessageId}`)
      nextMessageId = await appendMessageBatch(nextMessageId)
    }
  }
  catch (err) {
    console.log(err)
  }
}

