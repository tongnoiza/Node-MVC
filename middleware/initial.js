
const express = require('express')
const app = express()
const f = require('fs')
const multer = require('multer')
const upload = multer({ dest: '../TEST/upload/' })
const bodyParser = require('body-parser')
var cors = require('cors');
const { env } = require('process')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json())
let port = 443 || process.env.port

function set(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
  res.header('Content-Type', 'application/json')
  next()
}
app.use(set)
app.listen(port, function () {
  console.log(`Start Server On Port ${port}`);
})

module.exports = { set, app, f, upload }

