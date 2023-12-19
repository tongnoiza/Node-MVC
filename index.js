import express from 'express'
import {WebSocketServer}from 'ws'
import bodyparser from 'body-parser'
import user from './Route/User.js'
import motorlog from './Route/motorlog.js'
// import './Route/websocket.js'

import cors from 'cors'
const app = express();
app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json())


app.use('/User',user)
app.use('/log',motorlog)

const s = app.listen(3001,()=>{
  console.log('run at');
})
const wss = new WebSocketServer({noServer:true}); 
s.on('upgrade', (req, socket, head) => {
  socket.on('error', onSocketPreError);

  // perform auth
  // if (!!req.headers['BadAuth']) {
  //     socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
  //     socket.destroy();
  //     return;
  // }

  wss.handleUpgrade(req, socket, head, (ws) => {
      socket.removeListener('error', onSocketPreError);
      wss.emit('connection', ws, req);
  });
});

// สร้าง websockets server ที่ port 4000
console.log('// สร้าง websockets server ที่ port 80');

wss.on('connection', function connection(ws) { 
    console.log('มีการเชื่อมต่อ ');
    // สร้าง connection
  ws.on('message', function incoming(message) {
   // รอรับ data อะไรก็ตาม ที่มาจาก client แบบตลอดเวลา
    console.log('received: %s', message);
  });
ws.on('close', function close() {
  // จะทำงานเมื่อปิด Connection ในตัวอย่างคือ ปิด Browser
    console.log('disconnected');
  });
ws.send('init message to client');
  // ส่ง data ไปที่ client เชื่อมกับ websocket server นี้
});



