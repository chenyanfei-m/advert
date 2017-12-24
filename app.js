const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const log4js = require('log4js')
const { log } = require('./config.js')

const Mask = require('./routes/mask')
const Goto = require('./routes/goto')
const GetImg = require('./routes/getImg')

log4js.configure({
  appenders: log.appenders,
  categories: log.categories
})
const logger = log4js.getLogger(log.logger)

let app = express()
app.use(express.static('static'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer())
app.use(log4js.connectLogger(log4js.getLogger(log.logger)))

Mask(app)
Goto(app)
GetImg(app)

app.listen(3000)