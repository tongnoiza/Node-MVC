import express from 'express'
import bodyparser from 'body-parser'
import user from './Route/User.js'
import motorlog from './Route/motorlog.js'
import cors from 'cors'

import { WebSocketServer } from 'ws';
const app = express();
app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
const port = 443


const wss = new WebSocketServer({ port: port});

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});

app.use(express.json())


app.use('/User',user)
app.use('/log',motorlog)

app.listen(8080,()=>{
  console.log(`runing at port ${port}`);
})


