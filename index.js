
let {set,app,f}  = require('./middleware/initial')
let product = require('./Route/Product')
app.use('/Product',product)

