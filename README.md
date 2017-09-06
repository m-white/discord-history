# discord-history

Quick and dirty script for grabbing full chat history for a particular channel.  Used to feed into word clouds, so stop words are filtered.

## Usage
 1. Run `npm i` to install dependencies.
 2. Update `config.js` with your auth token and desired channel ID.
 3. Run `npm start`.
 4. Channel history is written to `output/messages-{channelId}-{timestamp}.txt`
