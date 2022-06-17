const express = require('express')
const routes = require('./routes')
const webhookRouter = require('./routes/webhook')
const exphbs = require('express-handlebars')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT || 3000

// handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use('/webhook', webhookRouter)
app.use(routes)
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
