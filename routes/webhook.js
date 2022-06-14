const express = require('express')
const router = express.Router()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// linebot module
const linebot = require('linebot')
// linebot information
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
const linebotParser = bot.parser()

// linebot message event
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
  if (msg === '外帶預約') {
    event.reply(
      {
        type: "flex",
        altText: "this is a flex message",
        contents:
        {
          type: "carousel",
          contents: [
            {
              type: "bubble",
              size: "kilo",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "image",
                    url: "https://d1ralsognjng37.cloudfront.net/148b226b-10f4-4cb1-8b07-0b7d3c06a232.jpeg",
                    size: "full",
                    aspectMode: "cover",
                    aspectRatio: "2:3",
                    gravity: "top"
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "text",
                            text: "原味章魚燒",
                            size: "xl",
                            color: "#ffffff",
                            weight: "bold"
                          }
                        ]
                      },
                      {
                        type: "box",
                        layout: "baseline",
                        contents: [
                          {
                            type: "text",
                            text: "NT$ 130",
                            color: "#ebebeb",
                            size: "md",
                            flex: 0
                          }
                        ],
                        spacing: "lg"
                      },
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "filler"
                          },
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "filler"
                              },
                              {
                                type: "icon",
                                url: "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip14.png"
                              },
                              {
                                type: "text",
                                text: "Add to cart",
                                color: "#ffffff",
                                flex: 0,
                                offsetTop: "-2px"
                              },
                              {
                                type: "filler"
                              }
                            ],
                            spacing: "sm"
                          },
                          {
                            type: "filler"
                          }
                        ],
                        borderWidth: "1px",
                        cornerRadius: "4px",
                        spacing: "sm",
                        borderColor: "#ffffff",
                        margin: "xxl",
                        height: "40px"
                      }
                    ],
                    position: "absolute",
                    offsetBottom: "0px",
                    offsetStart: "0px",
                    offsetEnd: "0px",
                    backgroundColor: "#03303Acc",
                    paddingAll: "20px",
                    paddingTop: "18px"
                  }
                ],
                paddingAll: "0px"
              }
            },
            {
              type: "bubble",
              size: "kilo",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "image",
                    url: "https://d1ralsognjng37.cloudfront.net/d86aff84-d2f4-4bcb-9941-846a040ce3ea.jpeg",
                    size: "full",
                    aspectMode: "cover",
                    aspectRatio: "2:3",
                    gravity: "top"
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "text",
                            text: "柚香蔥花章魚燒",
                            size: "xl",
                            color: "#ffffff",
                            weight: "bold"
                          }
                        ]
                      },
                      {
                        type: "box",
                        layout: "baseline",
                        contents: [
                          {
                            type: "text",
                            text: "NT$ 150",
                            color: "#ebebeb",
                            size: "md",
                            flex: 0
                          }
                        ],
                        spacing: "lg"
                      },
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "filler"
                          },
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "filler"
                              },
                              {
                                type: "icon",
                                url: "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip14.png"
                              },
                              {
                                type: "text",
                                text: "Add to cart",
                                color: "#ffffff",
                                flex: 0,
                                offsetTop: "-2px"
                              },
                              {
                                type: "filler"
                              }
                            ],
                            spacing: "sm"
                          },
                          {
                            type: "filler"
                          }
                        ],
                        borderWidth: "1px",
                        cornerRadius: "4px",
                        spacing: "sm",
                        borderColor: "#ffffff",
                        margin: "xxl",
                        height: "40px"
                      }
                    ],
                    position: "absolute",
                    offsetBottom: "0px",
                    offsetStart: "0px",
                    offsetEnd: "0px",
                    backgroundColor: "#03303Acc",
                    paddingAll: "20px",
                    paddingTop: "18px"
                  }
                ],
                paddingAll: "0px"
              }
            },
            {
              type: "bubble",
              size: "kilo",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "image",
                    url: "https://d1ralsognjng37.cloudfront.net/3fdf4e94-a441-4da3-99fd-8657bc876de8.jpeg",
                    size: "full",
                    aspectMode: "cover",
                    aspectRatio: "2:3",
                    gravity: "top"
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "text",
                            text: "雞蛋沙拉章魚燒",
                            size: "xl",
                            color: "#ffffff",
                            weight: "bold"
                          }
                        ]
                      },
                      {
                        type: "box",
                        layout: "baseline",
                        contents: [
                          {
                            type: "text",
                            text: "NT$ 150",
                            color: "#ebebeb",
                            size: "md",
                            flex: 0
                          }
                        ],
                        spacing: "lg"
                      },
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "filler"
                          },
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "filler"
                              },
                              {
                                type: "icon",
                                url: "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip14.png"
                              },
                              {
                                type: "text",
                                text: "Add to cart",
                                color: "#ffffff",
                                flex: 0,
                                offsetTop: "-2px"
                              },
                              {
                                type: "filler"
                              }
                            ],
                            spacing: "sm"
                          },
                          {
                            type: "filler"
                          }
                        ],
                        borderWidth: "1px",
                        cornerRadius: "4px",
                        spacing: "sm",
                        borderColor: "#ffffff",
                        margin: "xxl",
                        height: "40px"
                      }
                    ],
                    position: "absolute",
                    offsetBottom: "0px",
                    offsetStart: "0px",
                    offsetEnd: "0px",
                    backgroundColor: "#03303Acc",
                    paddingAll: "20px",
                    paddingTop: "18px"
                  }
                ],
                paddingAll: "0px"
              }
            },
            {
              type: "bubble",
              size: "kilo",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "image",
                    url: "https://d1ralsognjng37.cloudfront.net/3512aa91-dc32-4565-975b-c6890e39d1e7.jpeg",
                    size: "full",
                    aspectMode: "cover",
                    aspectRatio: "2:3",
                    gravity: "top"
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "text",
                            text: "起司明太子章魚燒",
                            size: "xl",
                            color: "#ffffff",
                            weight: "bold"
                          }
                        ]
                      },
                      {
                        type: "box",
                        layout: "baseline",
                        contents: [
                          {
                            type: "text",
                            text: "NT$ 150",
                            color: "#ebebeb",
                            size: "md",
                            flex: 0
                          }
                        ],
                        spacing: "lg"
                      },
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "filler"
                          },
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "filler"
                              },
                              {
                                type: "icon",
                                url: "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip14.png"
                              },
                              {
                                type: "text",
                                text: "Add to cart",
                                color: "#ffffff",
                                flex: 0,
                                offsetTop: "-2px"
                              },
                              {
                                type: "filler"
                              }
                            ],
                            spacing: "sm"
                          },
                          {
                            type: "filler"
                          }
                        ],
                        borderWidth: "1px",
                        cornerRadius: "4px",
                        spacing: "sm",
                        borderColor: "#ffffff",
                        margin: "xxl",
                        height: "40px"
                      }
                    ],
                    position: "absolute",
                    offsetBottom: "0px",
                    offsetStart: "0px",
                    offsetEnd: "0px",
                    backgroundColor: "#03303Acc",
                    paddingAll: "20px",
                    paddingTop: "18px"
                  }
                ],
                paddingAll: "0px"
              }
            }
          ]
        }
      }
    )
  }
  if (msg === '菜單') {
    event.reply(
      {
        type: "image",
        originalContentUrl: "https://pic.pimg.tw/pokerlife/1577256102-2369965690_wn.jpg",
        previewImageUrl: "https://pic.pimg.tw/pokerlife/1577256102-2369965690_wn.jpg"
      }
    )
  }
  if (msg === '營業時間') {
    event.reply(
      {
        type: "flex",
        altText: "this is a flex message",
        contents:
        {
          type: "bubble",
          hero: {
            type: "image",
            url: "https://www.mirrormedia.com.tw/assets/images/20180920181807-41cd69807de8c229f0a61d81af48965f-tablet.jpg",
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
                text: "銀角酒場",
                weight: "bold",
                size: "xl"
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                  },
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                  },
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                  },
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                  },
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
                  },
                  {
                    type: "text",
                    text: "4.0",
                    size: "sm",
                    color: "#999999",
                    margin: "md",
                    flex: 0
                  }
                ]
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
                        text: "Place",
                        color: "#aaaaaa",
                        size: "sm",
                        flex: 1
                      },
                      {
                        type: "text",
                        text: "台北市中山區林森北路121之1號",
                        wrap: true,
                        color: "#666666",
                        size: "sm",
                        flex: 5
                      }
                    ]
                  },
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "Time",
                        color: "#aaaaaa",
                        size: "sm",
                        flex: 1
                      },
                      {
                        type: "text",
                        text: "週一至週六 18:00 - 02:00\n週日 17:00 - 00:00",
                        wrap: true,
                        color: "#666666",
                        size: "sm",
                        flex: 5
                      }
                    ]
                  },
                  {
                    type: "box",
                    layout: "baseline",
                    contents: [
                      {
                        type: "text",
                        text: "Phone",
                        color: "#aaaaaa",
                        size: "sm",
                        flex: 1
                      },
                      {
                        type: "text",
                        wrap: true,
                        color: "#666666",
                        size: "sm",
                        flex: 5,
                        text: "(02) 2511 5557"
                      }
                    ]
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
                  type: "uri",
                  label: "Google Map",
                  uri: "https://www.google.com/maps/place/%E9%8A%80%E8%A7%92%E9%85%92%E5%A0%B4/@25.0507481,121.5230219,17z/data=!3m1!4b1!4m5!3m4!1s0x3442a96f5a0c1b2f:0x6ec36376d91893e1!8m2!3d25.0507481!4d121.5252106"
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

router.post('/', linebotParser)

module.exports = router