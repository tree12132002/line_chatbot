const express = require('express')
const router = express.Router()
const { Cart, Orderlist } = require('../models')

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
      type: 'text',
      text: '感謝加入銀角酒場！\n\n此為開發測試用帳號\n有任何問題還請聯繫:\ntree12132002@hotmail.com'
    },
    {
      type: 'sticker',
      packageId: '6136',
      stickerId: '10551380'
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
  const userId = event.source.uerId

  if (msg === '最新消息') {
    event.reply(
      {
        type: 'text',
        text: '最新推出夏季特調High Ball！\n紅心芭樂、芒果、金桔檸檬和冬瓜茶等多種口味！\n快把握下夏天的時光，來銀角酒場品嚐好吃的日式章魚燒及好喝的酒類飲品吧！'
      }
    )
  }
  if (msg === '店面位置') {
    event.reply(
      {
        type: 'location',
        title: '銀角酒場',
        address: '台北市中山區林森北路121之1號',
        latitude: 25.05093275637032,
        longitude: 121.52519986814322
      }
    )
  }
  if (msg === '線上訂位') {
    event.reply(
      {
        type: 'flex',
        altText: 'this is a flex message',
        contents:
        {
          type: 'bubble',
          size: 'kilo',
          hero: {
            type: 'image',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKUukvT3xmkGHs3rXYXugZXekOfjnRgZn-8g&usqp=CAU',
            size: 'full',
            aspectRatio: '20:13',
            aspectMode: 'cover'
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '預約訂位',
                weight: 'bold',
                size: 'md'
              },
              {
                type: 'box',
                layout: 'vertical',
                margin: 'lg',
                spacing: 'sm',
                contents: [
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: '由於沒有用餐時間限制，僅限來電預定，若造成不便敬請見諒',
                        size: 'md',
                        color: '#aaaaaa',
                        wrap: true
                      }
                    ]
                  },
                  {
                    type: 'separator'
                  }
                ]
              }
            ]
          },
          footer: {
            type: 'box',
            layout: 'vertical',
            spacing: 'sm',
            contents: [
              {
                type: 'button',
                style: 'link',
                height: 'sm',
                action: {
                  type: 'message',
                  label: '電話預約',
                  text: '02 2511 5557'
                }
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [],
                margin: 'sm'
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
        type: 'flex',
        altText: 'this is a flex message',
        contents:
        {
          type: 'carousel',
          contents: [
            {
              type: 'bubble',
              size: 'kilo',
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'image',
                    url: 'https://d1ralsognjng37.cloudfront.net/148b226b-10f4-4cb1-8b07-0b7d3c06a232.jpeg',
                    size: 'full',
                    aspectMode: 'cover',
                    aspectRatio: '2:3',
                    gravity: 'top'
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: '原味章魚燒',
                            size: 'xl',
                            color: '#ffffff',
                            weight: 'bold'
                          }
                        ]
                      },
                      {
                        type: 'box',
                        layout: 'baseline',
                        contents: [
                          {
                            type: 'text',
                            text: 'NT$ 130',
                            color: '#ebebeb',
                            size: 'md',
                            flex: 0
                          }
                        ],
                        spacing: 'lg'
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'filler'
                          },
                          {
                            type: 'box',
                            layout: 'baseline',
                            contents: [
                              {
                                type: 'filler'
                              },
                              {
                                type: 'icon',
                                url: 'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip14.png'
                              },
                              {
                                type: 'text',
                                text: 'Add to cart',
                                color: '#ffffff',
                                flex: 0,
                                offsetTop: '-2px'
                              },
                              {
                                type: 'filler'
                              }
                            ],
                            spacing: 'sm',
                            action: {
                              type: 'postback',
                              label: 'Add to cart',
                              data: 'type=order&item=原味章魚燒&quantity=1&price=130'
                            }
                          },
                          {
                            type: 'filler'
                          }
                        ],
                        borderWidth: '1px',
                        cornerRadius: '4px',
                        spacing: 'sm',
                        borderColor: '#ffffff',
                        margin: 'xxl',
                        height: '40px'
                      }
                    ],
                    position: 'absolute',
                    offsetBottom: '0px',
                    offsetStart: '0px',
                    offsetEnd: '0px',
                    backgroundColor: '#03303Acc',
                    paddingAll: '20px',
                    paddingTop: '18px'
                  }
                ],
                paddingAll: '0px'
              }
            },
            {
              type: 'bubble',
              size: 'kilo',
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'image',
                    url: 'https://d1ralsognjng37.cloudfront.net/d86aff84-d2f4-4bcb-9941-846a040ce3ea.jpeg',
                    size: 'full',
                    aspectMode: 'cover',
                    aspectRatio: '2:3',
                    gravity: 'top'
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: '柚香蔥花章魚燒',
                            size: 'xl',
                            color: '#ffffff',
                            weight: 'bold'
                          }
                        ]
                      },
                      {
                        type: 'box',
                        layout: 'baseline',
                        contents: [
                          {
                            type: 'text',
                            text: 'NT$ 150',
                            color: '#ebebeb',
                            size: 'md',
                            flex: 0
                          }
                        ],
                        spacing: 'lg'
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'filler'
                          },
                          {
                            type: 'box',
                            layout: 'baseline',
                            contents: [
                              {
                                type: 'filler'
                              },
                              {
                                type: 'icon',
                                url: 'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip14.png'
                              },
                              {
                                type: 'text',
                                text: 'Add to cart',
                                color: '#ffffff',
                                flex: 0,
                                offsetTop: '-2px'
                              },
                              {
                                type: 'filler'
                              }
                            ],
                            spacing: 'sm',
                            action: {
                              type: 'postback',
                              label: 'Add to cart',
                              data: 'type=order&item=柚香蔥花章魚燒&quantity=1&price=150'
                            }
                          },
                          {
                            type: 'filler'
                          }
                        ],
                        borderWidth: '1px',
                        cornerRadius: '4px',
                        spacing: 'sm',
                        borderColor: '#ffffff',
                        margin: 'xxl',
                        height: '40px'
                      }
                    ],
                    position: 'absolute',
                    offsetBottom: '0px',
                    offsetStart: '0px',
                    offsetEnd: '0px',
                    backgroundColor: '#03303Acc',
                    paddingAll: '20px',
                    paddingTop: '18px'
                  }
                ],
                paddingAll: '0px'
              }
            },
            {
              type: 'bubble',
              size: 'kilo',
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'image',
                    url: 'https://d1ralsognjng37.cloudfront.net/3fdf4e94-a441-4da3-99fd-8657bc876de8.jpeg',
                    size: 'full',
                    aspectMode: 'cover',
                    aspectRatio: '2:3',
                    gravity: 'top'
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: '雞蛋沙拉章魚燒',
                            size: 'xl',
                            color: '#ffffff',
                            weight: 'bold'
                          }
                        ]
                      },
                      {
                        type: 'box',
                        layout: 'baseline',
                        contents: [
                          {
                            type: 'text',
                            text: 'NT$ 150',
                            color: '#ebebeb',
                            size: 'md',
                            flex: 0
                          }
                        ],
                        spacing: 'lg'
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'filler'
                          },
                          {
                            type: 'box',
                            layout: 'baseline',
                            contents: [
                              {
                                type: 'filler'
                              },
                              {
                                type: 'icon',
                                url: 'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip14.png'
                              },
                              {
                                type: 'text',
                                text: 'Add to cart',
                                color: '#ffffff',
                                flex: 0,
                                offsetTop: '-2px'
                              },
                              {
                                type: 'filler'
                              }
                            ],
                            spacing: 'sm',
                            action: {
                              type: 'postback',
                              label: 'Add to cart',
                              data: 'type=order&item=雞蛋沙拉章魚燒&quantity=1&price=150'
                            }
                          },
                          {
                            type: 'filler'
                          }
                        ],
                        borderWidth: '1px',
                        cornerRadius: '4px',
                        spacing: 'sm',
                        borderColor: '#ffffff',
                        margin: 'xxl',
                        height: '40px'
                      }
                    ],
                    position: 'absolute',
                    offsetBottom: '0px',
                    offsetStart: '0px',
                    offsetEnd: '0px',
                    backgroundColor: '#03303Acc',
                    paddingAll: '20px',
                    paddingTop: '18px'
                  }
                ],
                paddingAll: '0px'
              }
            },
            {
              type: 'bubble',
              size: 'kilo',
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'image',
                    url: 'https://d1ralsognjng37.cloudfront.net/3512aa91-dc32-4565-975b-c6890e39d1e7.jpeg',
                    size: 'full',
                    aspectMode: 'cover',
                    aspectRatio: '2:3',
                    gravity: 'top'
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: '起司明太子章魚燒',
                            size: 'xl',
                            color: '#ffffff',
                            weight: 'bold'
                          }
                        ]
                      },
                      {
                        type: 'box',
                        layout: 'baseline',
                        contents: [
                          {
                            type: 'text',
                            text: 'NT$ 150',
                            color: '#ebebeb',
                            size: 'md',
                            flex: 0
                          }
                        ],
                        spacing: 'lg'
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'filler'
                          },
                          {
                            type: 'box',
                            layout: 'baseline',
                            contents: [
                              {
                                type: 'filler'
                              },
                              {
                                type: 'icon',
                                url: 'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip14.png'
                              },
                              {
                                type: 'text',
                                text: 'Add to cart',
                                color: '#ffffff',
                                flex: 0,
                                offsetTop: '-2px'
                              },
                              {
                                type: 'filler'
                              }
                            ],
                            spacing: 'sm',
                            action: {
                              type: 'postback',
                              label: 'Add to cart',
                              data: 'type=order&item=起司明太子章魚燒&quantity=1&price=150'
                            }
                          },
                          {
                            type: 'filler'
                          }
                        ],
                        borderWidth: '1px',
                        cornerRadius: '4px',
                        spacing: 'sm',
                        borderColor: '#ffffff',
                        margin: 'xxl',
                        height: '40px'
                      }
                    ],
                    position: 'absolute',
                    offsetBottom: '0px',
                    offsetStart: '0px',
                    offsetEnd: '0px',
                    backgroundColor: '#03303Acc',
                    paddingAll: '20px',
                    paddingTop: '18px'
                  }
                ],
                paddingAll: '0px'
              }
            },
            {
              type: 'bubble',
              size: 'kilo',
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: '線上訂餐功能',
                    size: 'xl'
                  },
                  {
                    type: 'separator'
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'filler'
                          },
                          {
                            type: 'box',
                            layout: 'baseline',
                            contents: [
                              {
                                type: 'filler'
                              },
                              {
                                type: 'text',
                                text: '購物車查詢',
                                flex: 0,
                                offsetTop: '-2px'
                              },
                              {
                                type: 'filler'
                              }
                            ],
                            spacing: 'sm',
                            action: {
                              type: 'message',
                              text: '購物車查詢'
                            }
                          },
                          {
                            type: 'filler'
                          }
                        ],
                        borderWidth: '1px',
                        cornerRadius: '4px',
                        spacing: 'sm',
                        borderColor: '#aaaaaa',
                        margin: 'xxl',
                        height: '40px'
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'filler'
                          },
                          {
                            type: 'box',
                            layout: 'baseline',
                            contents: [
                              {
                                type: 'filler'
                              },
                              {
                                type: 'text',
                                text: '訂單查詢',
                                flex: 0,
                                offsetTop: '-2px'
                              },
                              {
                                type: 'filler'
                              }
                            ],
                            spacing: 'sm',
                            action: {
                              type: 'message',
                              text: '訂單查詢'
                            }
                          },
                          {
                            type: 'filler'
                          }
                        ],
                        borderWidth: '1px',
                        cornerRadius: '4px',
                        spacing: 'sm',
                        borderColor: '#aaaaaa',
                        margin: 'xxl',
                        height: '40px'
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'filler'
                          },
                          {
                            type: 'box',
                            layout: 'baseline',
                            contents: [
                              {
                                type: 'filler'
                              },
                              {
                                type: 'text',
                                text: '來電訂購',
                                flex: 0,
                                offsetTop: '-2px'
                              },
                              {
                                type: 'filler'
                              }
                            ],
                            spacing: 'sm',
                            action: {
                              type: 'message',
                              text: '02 2511 5557'
                            }
                          },
                          {
                            type: 'filler'
                          }
                        ],
                        borderWidth: '1px',
                        cornerRadius: '4px',
                        spacing: 'sm',
                        borderColor: '#aaaaaa',
                        margin: 'xxl',
                        height: '40px'
                      }
                    ]
                  }
                ]
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
        type: 'image',
        originalContentUrl: 'https://pic.pimg.tw/pokerlife/1577256102-2369965690_wn.jpg',
        previewImageUrl: 'https://pic.pimg.tw/pokerlife/1577256102-2369965690_wn.jpg'
      }
    )
  }
  if (msg === '營業時間') {
    event.reply(
      {
        type: 'flex',
        altText: 'this is a flex message',
        contents:
        {
          type: 'bubble',
          hero: {
            type: 'image',
            url: 'https://www.mirrormedia.com.tw/assets/images/20180920181807-41cd69807de8c229f0a61d81af48965f-tablet.jpg',
            size: 'full',
            aspectRatio: '20:13',
            aspectMode: 'cover'
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '銀角酒場',
                weight: 'bold',
                size: 'xl'
              },
              {
                type: 'box',
                layout: 'baseline',
                margin: 'md',
                contents: [
                  {
                    type: 'icon',
                    size: 'sm',
                    url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                  },
                  {
                    type: 'icon',
                    size: 'sm',
                    url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                  },
                  {
                    type: 'icon',
                    size: 'sm',
                    url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                  },
                  {
                    type: 'icon',
                    size: 'sm',
                    url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                  },
                  {
                    type: 'icon',
                    size: 'sm',
                    url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
                  },
                  {
                    type: 'text',
                    text: '4.0',
                    size: 'sm',
                    color: '#999999',
                    margin: 'md',
                    flex: 0
                  }
                ]
              },
              {
                type: 'box',
                layout: 'vertical',
                margin: 'lg',
                spacing: 'sm',
                contents: [
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: 'Place',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 1
                      },
                      {
                        type: 'text',
                        text: '台北市中山區林森北路121之1號',
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 5
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: 'Time',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 1
                      },
                      {
                        type: 'text',
                        text: '週一至週六 18:00 - 02:00\n週日 17:00 - 00:00',
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 5
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    contents: [
                      {
                        type: 'text',
                        text: 'Phone',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 1
                      },
                      {
                        type: 'text',
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 5,
                        text: '(02) 2511 5557'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          footer: {
            type: 'box',
            layout: 'vertical',
            spacing: 'sm',
            contents: [
              {
                type: 'button',
                style: 'link',
                height: 'sm',
                action: {
                  type: 'uri',
                  label: 'Google Map',
                  uri: 'https://www.google.com/maps/place/%E9%8A%80%E8%A7%92%E9%85%92%E5%A0%B4/@25.0507481,121.5230219,17z/data=!3m1!4b1!4m5!3m4!1s0x3442a96f5a0c1b2f:0x6ec36376d91893e1!8m2!3d25.0507481!4d121.5252106'
                }
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [],
                margin: 'sm'
              }
            ],
            flex: 0
          }
        }
      }
    )
  }
  if (msg === '購物車查詢') {
    Cart.findAll({
      where: userId === userId,
      raw: true,
      nest: true
    })
      .then(carts => {
        if (!carts.length) {
          return event.reply(
            {
              type: 'text',
              text: '購物車是空的，想點些什麼呢？'
            }
          )
        }
        const orderItems = []
        let quantityAmount = 0
        let priceAmount = 0

        carts.forEach(cart => {
          orderItems.push(`${cart.item} ${cart.quantity}份 ${cart.price}元`)
          quantityAmount += cart.quantity
          priceAmount += cart.price
        })
        const cartItem = orderItems.join('\n')
        event.reply(
          {
            type: 'template',
            altText: 'this is a confirm template',
            template: {
              type: 'confirm',
              actions: [
                {
                  type: 'postback',
                  label: '重新下單',
                  data: 'type=reorder'
                },
                {
                  type: 'postback',
                  label: '確認下單',
                  data: 'type=checkout'
                }
              ],
              text: `購物車內容：\n\n${cartItem}\n\n總共 ${quantityAmount}份 ${priceAmount}元`
            }
          }
        )
      })
  }
  if (msg === '訂單查詢') {
    Orderlist.findAll({
      where: userId === userId,
      order: [['createdAt', 'DESC']],
      limit: 1,
      raw: true,
      nest: true
    })
      .then(orderlist => {
        if (!orderlist.length) {
          return event.reply(
            {
              type: 'text',
              text: '目前沒有訂單記錄'
            }
          )
        }
        let quantityAmount = 0
        let priceAmount = 0
        const quantityArr = orderlist[0].quantity.split('\n')
        const priceArr = orderlist[0].price.split('\n')
        const time = `${orderlist[0].createdAt.toISOString().split('T')[0]} ${orderlist[0].createdAt.toISOString().split('T')[1].substr(0, 5)}`

        quantityArr.forEach(item => {
          quantityAmount += Number(item)
        })
        priceArr.forEach(item => {
          priceAmount += Number(item)
        })
        event.reply(
          {
            type: 'flex',
            altText: 'this is a flex message',
            contents:
            {
              type: 'bubble',
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: '訂餐明細',
                    weight: 'bold',
                    color: '#1DB446',
                    size: 'sm'
                  },
                  {
                    type: 'text',
                    text: '銀角酒場',
                    weight: 'bold',
                    size: 'xxl',
                    margin: 'md'
                  },
                  {
                    type: 'text',
                    text: '台北市中山區林森北路121-1號',
                    size: 'xs',
                    color: '#aaaaaa',
                    wrap: true
                  },
                  {
                    type: 'separator',
                    margin: 'xxl'
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    margin: 'xxl',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${orderlist[0].item}`,
                            size: 'sm',
                            color: '#555555',
                            flex: 0,
                            wrap: true
                          },
                          {
                            type: 'text',
                            text: `${orderlist[0].quantity}`,
                            size: 'sm',
                            color: '#111111',
                            align: 'end',
                            wrap: true
                          },
                          {
                            type: 'text',
                            text: `${orderlist[0].price}`,
                            size: 'sm',
                            color: '#111111',
                            align: 'end',
                            wrap: true
                          }
                        ]
                      },
                      {
                        type: 'separator',
                        margin: 'xxl'
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        margin: 'xxl',
                        contents: [
                          {
                            type: 'text',
                            text: '數量',
                            size: 'sm',
                            color: '#555555'
                          },
                          {
                            type: 'text',
                            text: `${quantityAmount}`,
                            size: 'sm',
                            color: '#111111',
                            align: 'end'
                          }
                        ]
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: '總金額',
                            size: 'sm',
                            color: '#555555'
                          },
                          {
                            type: 'text',
                            text: `${priceAmount}`,
                            size: 'sm',
                            color: '#111111',
                            align: 'end',
                            action: {
                              type: 'postback',
                              label: 'action',
                              data: 'hello',
                              displayText: '訂單查詢'
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'separator',
                    margin: 'xxl'
                  },
                  {
                    type: 'box',
                    layout: 'horizontal',
                    margin: 'md',
                    contents: [
                      {
                        type: 'text',
                        text: `訂單時間：${time}`,
                        size: 'xs',
                        color: '#aaaaaa',
                        flex: 0,
                        wrap: true
                      }
                    ]
                  }
                ]
              },
              styles: {
                footer: {
                  separator: true
                }
              }
            }
          }
        )
      })
  }
})
bot.on('postback', event => {
  const postback = event.postback.data.split('&')
  const userId = event.source.userId

  if (postback[0] === 'type=order') {
    if (postback[1] === 'item=原味章魚燒') {
      event.reply('原味章魚燒加入購物車')
      Cart.findOne({
        where: { item: '原味章魚燒' }
      })
        .then(cart => {
          if (!cart) {
            Cart.create({
              userId,
              item: '原味章魚燒',
              quantity: 1,
              price: 130
            })
          } else {
            cart.update({
              quantity: cart.quantity + 1,
              price: cart.price + 130
            })
          }
        })
    }
    if (postback[1] === 'item=柚香蔥花章魚燒') {
      event.reply('柚香蔥花章魚燒加入購物車')
      Cart.findOne({
        where: { item: '柚香蔥花章魚燒' }
      })
        .then(cart => {
          if (!cart) {
            Cart.create({
              userId,
              item: '柚香蔥花章魚燒',
              quantity: 1,
              price: 150
            })
          } else {
            cart.update({
              quantity: cart.quantity + 1,
              price: cart.price + 150
            })
          }
        })
    }
    if (postback[1] === 'item=雞蛋沙拉章魚燒') {
      event.reply('雞蛋沙拉章魚燒加入購物車')
      Cart.findOne({
        where: { item: '雞蛋沙拉章魚燒' }
      })
        .then(cart => {
          if (!cart) {
            Cart.create({
              userId,
              item: '雞蛋沙拉章魚燒',
              quantity: 1,
              price: 150
            })
          } else {
            cart.update({
              quantity: cart.quantity + 1,
              price: cart.price + 150
            })
          }
        })
    }
    if (postback[1] === 'item=起司明太子章魚燒') {
      event.reply('起司明太子章魚燒加入購物車')
      Cart.findOne({
        where: { item: '起司明太子章魚燒' }
      })
        .then(cart => {
          if (!cart) {
            Cart.create({
              userId,
              item: '起司明太子章魚燒',
              quantity: 1,
              price: 150
            })
          } else {
            cart.update({
              quantity: cart.quantity + 1,
              price: cart.price + 150
            })
          }
        })
    }
  }
  if (postback[0] === 'type=reorder') {
    event.reply('已清空購物車，歡迎您再次訂購')
    Cart.destroy({
      where: userId === userId,
      truncate: true
    })
  }
  if (postback[0] === 'type=checkout') {
    Cart.findAll({
      where: userId === userId,
      raw: true,
      nest: true
    })
      .then(carts => {
        const orderItems = []
        const orderQuantity = []
        const orderPrice = []
        let priceAmount = 0
        let quantityAmount = 0

        carts.forEach(cart => {
          orderItems.push(cart.item)
          orderQuantity.push(cart.quantity)
          orderPrice.push(cart.price)
          quantityAmount += cart.quantity
          priceAmount += cart.price
        })
        const item = orderItems.join('\n')
        const quantity = orderQuantity.join('\n')
        const price = orderPrice.join('\n')

        event.reply(
          {
            type: 'flex',
            altText: 'this is a flex message',
            contents:
            {
              type: 'bubble',
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: '訂餐明細',
                    weight: 'bold',
                    color: '#1DB446',
                    size: 'sm'
                  },
                  {
                    type: 'text',
                    text: '銀角酒場',
                    weight: 'bold',
                    size: 'xxl',
                    margin: 'md'
                  },
                  {
                    type: 'text',
                    text: '台北市中山區林森北路121-1號',
                    size: 'xs',
                    color: '#aaaaaa',
                    wrap: true
                  },
                  {
                    type: 'separator',
                    margin: 'xxl'
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    margin: 'xxl',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${item}`,
                            size: 'sm',
                            color: '#555555',
                            flex: 0,
                            wrap: true
                          },
                          {
                            type: 'text',
                            text: `${quantity}`,
                            size: 'sm',
                            color: '#111111',
                            align: 'end',
                            wrap: true
                          },
                          {
                            type: 'text',
                            text: `${price}`,
                            size: 'sm',
                            color: '#111111',
                            align: 'end',
                            wrap: true
                          }
                        ]
                      },
                      {
                        type: 'separator',
                        margin: 'xxl'
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        margin: 'xxl',
                        contents: [
                          {
                            type: 'text',
                            text: '數量',
                            size: 'sm',
                            color: '#555555'
                          },
                          {
                            type: 'text',
                            text: `${quantityAmount}`,
                            size: 'sm',
                            color: '#111111',
                            align: 'end'
                          }
                        ]
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: '總金額',
                            size: 'sm',
                            color: '#555555'
                          },
                          {
                            type: 'text',
                            text: `${priceAmount}`,
                            size: 'sm',
                            color: '#111111',
                            align: 'end',
                            action: {
                              type: 'postback',
                              label: 'action',
                              data: 'hello',
                              displayText: '訂單查詢'
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'separator',
                    margin: 'xxl'
                  },
                  {
                    type: 'box',
                    layout: 'horizontal',
                    margin: 'md',
                    contents: [
                      {
                        type: 'text',
                        text: '感謝您的訂購！\n製餐時間約略20分鐘，請您稍待片刻',
                        size: 'xs',
                        color: '#aaaaaa',
                        flex: 0,
                        wrap: true
                      }
                    ]
                  }
                ]
              },
              styles: {
                footer: {
                  separator: true
                }
              }
            }
          }
        )
        Promise.all([
          Orderlist.create({
            userId: carts[0].userId,
            item,
            quantity,
            price
          }),
          Cart.destroy({
            where: userId === userId,
            truncate: true
          })
        ])
      })
  }
})

router.post('/', linebotParser)

module.exports = router
