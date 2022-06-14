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
bot.on('follow', async event => {
  event.reply([
    {
      type: "text",
      text: "感謝加入銀角酒場！\n\n此為開發測試用帳號\n有任何問題還請聯繫:\ntree12132002@hotmail.com"
    },
    {
      type: "sticker",
      packageId: "6136",
      stickerId: "10551380"
    }
  ])
    .then(date => {
      // success
    })
    .catch(err => {
      console.log(err)
    })
})

bot.on('message', async event => {
  const msg = event.message.text

})
// 程式碼寫在上方

app.post('/webhook', linebotParser)
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
