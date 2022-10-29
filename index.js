const express = require('express')
 let {set,app,f}  = require('./middleware/initial')
let product = require('./Route/Product')
app.use(set)

app.use('/Product',product)

