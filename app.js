const express = require('express')
const webhookRouter = require('./routes/webhook')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT || 3000

app.use('/webhook', webhookRouter)
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
