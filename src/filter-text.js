const { toLower, words } = require('lodash')

const stopWords = require('./stop-words')

function isStopWord (word) {
  return !!stopWords[word]
}

module.exports = function filterText (text) {
  return words(text)
    .map((word) => toLower(word).replace(/'/g, ''))
    .filter((word) => !isStopWord(word) && word)
    .join(' ')
}