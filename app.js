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

  if (msg === '最新消息') {
    event.reply(
      {
        type: "text",
        text: "最新推出夏季特調High Ball！\n紅心芭樂、芒果、金桔檸檬和冬瓜茶等多種口味！\n快把握下夏天的時光，來銀角酒場品嚐好吃的日式章魚燒及好喝的酒類飲品吧！"
      }
    )
  }
  if (msg === '店面位置') {
    event.reply(
      {
        type: "location",
        title: "銀角酒場",
        address: "台北市中山區林森北路121之1號",
        latitude: 25.05093275637032,
        longitude: 121.52519986814322
      }
    )
  }
  if (msg === '線上訂位') {
    event.reply(
      {
        type: "flex",
        altText: "this is a flex message",
        contents:
        {
          type: "bubble",
          size: "kilo",
          hero: {
            type: "image",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKUukvT3xmkGHs3rXYXugZXekOfjnRgZn-8g&usqp=CAU",
            size: "full",
            aspectRatio: "20:13",
            aspectMode: "cover"
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "預約訂位",
                weight: "bold",
                size: "md"
              },
              {
                type: "box",
                layout: "vertical",
                margin: "lg",
                spacing: "sm",
                contents: [
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "若線上訂位，無法立即確認預約成功，建議於營業時間來電預約",
                        size: "md",
                        color: "#aaaaaa",
                        wrap: true
                      }
                    ]
                  },
                  {
                    type: "separator"
                  }
                ]
              }
            ]
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [
              {
                type: "button",
                style: "link",
                height: "sm",
                action: {
                  type: "datetimepicker",
                  label: "線上預約",
                  data: "reserveTime",
                  mode: "datetime",
                  initial: "2022-06-14T00:00",
                  min: "2022-06-14T00:00",
                  max: "2023-06-14T00:00"
                }
              },
              {
                type: "button",
                style: "link",
                height: "sm",
                action: {
                  type: "message",
                  label: "電話預約",
                  text: "02 2511 5557"
                }
              },
              {
                type: "box",
                layout: "vertical",
                contents: [],
                margin: "sm"
              }
            ],
            flex: 0
          }
        }
      }
    )
  }

})
// 程式碼寫在上方

app.post('/webhook', linebotParser)
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
