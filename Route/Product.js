const express = require('express')
const router = express.Router()
let {f,upload}  = require('../middleware/initial')
let { filesave, connect, mongoose, scm} = require('../config/connectdb')
const { promisify } = require('util')
const { json } = require('body-parser')
const unlinkAsync = promisify(f.unlink)


router.get('/',(req,res)=>{
    res.send('ok Success for Build WEB api')
})

router.post('/uploadfile', upload.single('file'), async (req, res) => {
    console.log('',req)
    let fil = await new filesave(req.file).save() // บันทึกลง mongodb
    let readf =await f.readFileSync( req.file.path, 'base64')// อ่านไฟล์ad
    var buf = await Buffer.from(readf, 'base64'); // แปลงจาก base 64 เป็น buffer
    f.writeFile('../TEST/files/' + req.file.originalname, buf, (err) => { //เขียนไฟล์จาก buffer
        if (err) console.log(err)
    })
    f.readdir('../TEST/upload/', (err, fiels) => { //ลบ ไฟล์ที่เป็น base64 ออก เพื่อให้มีแค่ ไฟล์ ที่ไม่เป็น base64 เท่านั้น
        if(err) new Error(err)
        fiels.forEach(v => {
            unlinkAsync('../TEST/upload/' + v)
        })
    })
    res.send(fil)
})

router.get('/loadfile/:name', async (req, res) => {
    let filedata = await filesave.find({originalname: req.params.name })
        .select('fieldname -_id')
        .select('originalname')
        .select('path')
        .select('filename')
        .select('destination')
    res.download('../TEST/files/' + filedata[0].originalname, filedata[0].originalname)
})
router.get('/getdata', async (req, res) => {
    let filedata = await filesave.find()
        .select('fieldname -_id')
        .select('originalname')
        .select('path')
        .select('filename')
        .select('destination')
    res.send(filedata)
})
router.get('/del', async (req, res) => {
    let d = await filesave.find().remove()
    // f.readdir('./upload/', (err, fiels) => {
    //     fiels.forEach(v => {
    //         unlinkAsync(__dirname + '\\upload\\' + v)
    //     })
    // })
    f.readdir('../TEST/files/', (err, fiels) => { //ลบไฟล์ที่เป็นbase64 เพื่อให้มีแค่ไฟล์ที่ไม่เป็น base64 เท่านั้น
        if(err) new Error(err)
        fiels.forEach(v => {
            unlinkAsync('../TEST/files/' + v)
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