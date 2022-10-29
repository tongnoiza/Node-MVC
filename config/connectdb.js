const mongoose = require('mongoose');
let filesave = mongoose.model("file", new mongoose.Schema({
    fieldname: { type: String, require: true },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    destination: { type: String },
    filename: { type: String },
    path: { type: String },
    size: { type: Number }
}))
const scm = mongoose.Schema({
    name: { type: String,},
    originalname: {}
})

let connect = mongoose.connect("mongodb://127.0.0.1:27017/name", async (err, db) => {
    if (await err) throw err
})

module.exports = { filesave, connect, mongoose, scm }