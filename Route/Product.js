const express = require('express')
const router = express.Router()
let {f,upload}  = require('../middleware/initial')
let { filesave, connect, mongoose, scm} = require('../config/connectdb')
const { promisify } = require('util')
const unlinkAsync = promisify(f.unlink)

router.post('/uploadfile', upload.single('file'), async (req, res) => {
    let fil = await new filesave(req.file).save() // บันทึกลง mongodb
    let readf = f.readFileSync(__dirname + '\\' + req.file.path, 'base64')// อ่านไฟล์
    var buf = Buffer.from(readf, 'base64'); // แปลงจาก base 64 เป็น buffer
    f.writeFile('./files\\' + req.file.originalname, buf, (err) => { //เขียนไฟล์จาก buffer
        if (err) console.log(err)
    })
    f.readdir('./upload/', (err, fiels) => { //ลบ ไฟล์ที่เป็น base64 ออก เพื่อให้มีแค่ ไฟล์ ที่ไม่เป็น base64 เท่านั้น
        fiels.forEach(v => {
            unlinkAsync(__dirname + '\\upload\\' + v)
        })
    })
    res.send(fil)
})

router.get('/loadfile/:name', async (req, res) => {
    let filedata = await filesave.find({ filename: req.params.name })
        .select('fieldname -_id')
        .select('originalname')
        .select('path')
        .select('filename')
        .select('destination')
    res.download(`${__dirname}\\` + filedata[0].path, filedata[0].originalname)
    // res.send(filedata)
})
router.get('/getdata', async (req, res) => {
    let filedata = await filesave.find()
        .select('fieldname -_id')
        .select('originalname')
        .select('path')
        .select('filename')
        .select('destination')
    // res.download(`${__dirname}\\`+filedata[0].path,filedata[0].originalname)
    res.send(filedata)
})
router.get('/del', async (req, res) => {
    let d = await filesave.find().remove()
    f.readdir('./upload/', (err, fiels) => {
        fiels.forEach(v => {
            unlinkAsync(__dirname + '\\upload\\' + v)
        })
    })
    res.send(d)
})

router.get('/getimage/:path/:filename', async (req, res) => {
    let { path, filename } = req.params
    let p = `${__dirname}\\upload\\${path}`;
    await f.existsSync(p)
    res.download(p, `${filename}`)
})

const ss = mongoose.model("testsave", scm)
router.post('/insert', async (req, res) => {
    var { body } = req
    const s = new ss(body)
    await s.save()
    res.end()
})

router.post('/find', async (req, res) => {
    console.log('req ', req.body)
    var f = await mongoose.model("testsave").find(req.body)
    console.log('ข้อมูลที่ดึงมา ', f)
    res.send(f)
})

module.exports = router