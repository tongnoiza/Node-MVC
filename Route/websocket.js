import {WebSocketServer}from 'ws'
const wss = new WebSocketServer({ port: 443 }); 
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
export default wss

