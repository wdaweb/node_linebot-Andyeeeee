// 引用 dotenv 讀取 .env
import 'dotenv/config'
// 引用 linebot
import linebot from 'linebot'
import axios from 'axios'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', async event => {
  if (event.message.type === 'text') {
    try {
      const { data } = await axios.get('https://themedata.culture.tw/opendata/object/Point.json?origin=tour.cksmh.gov.tw&lang=zh-tw&branch=home')

      for (const n1 of data.data) {
        if (n1.name === event.message.text) {

          event.reply([
            n1.content,
            n1.link,
            {
              type: 'image',
              originalContentUrl: 'https://images.goodsmile.info/cgm/images/product/20221028/13471/106542/large/b68d75a06227910b9107c57ab0fa98cc.jpg',
              previewImageUrl: 'https://images.goodsmile.info/cgm/images/product/20221028/13471/106542/large/b68d75a06227910b9107c57ab0fa98cc.jpg',
            }
          ])
          // event.reply([
          //   info.Description,
          //   {
          //     type: 'location',
          //     title: info.Name,
          //     address: info.Add,
          //     latitude: info.Py,
          //     longitude: info.Px
          //   }
          // ])
          return
        }
      }
      event.reply('找不到')
    } catch (error) {
      console.log(error)
      event.reply('發生錯誤')
    }
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
