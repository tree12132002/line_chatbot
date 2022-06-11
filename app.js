const express = require('express')
const linebot = require('linebot')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT || 3000 

const bot = new linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
const linebotParser = bot.parser()

// 程式碼寫在下方
bot.on('message', async event => {
  if (event.message.type === 'text') {
    event.reply(event.message.text)
  }
})
// 程式碼寫在上方

app.post('/webhook', linebotParser)
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})