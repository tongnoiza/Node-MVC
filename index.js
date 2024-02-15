import express from "express";
import bodyparser from "body-parser";
import user from "./Route/User.js";
import motorlog from "./Route/motorlog.js";
import cors from "cors";

import { WebSocketServer } from "ws";
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
const port = 443;

const wss = new WebSocketServer({port:8080 });

app.use(express.json());
app.on("upgrade", (request, socket, head) => {

  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
wss.on("connection",(ws)=>{
  console.log("เชื่อมต่อ");
   ws.on('message', function message(data) {
      console.log('received: %s', data);
      ws.send('something');
    });
})

app.use("/User", user);
app.use("/log", motorlog);

app.listen(port, () => {
  console.log(`runing at port ${port}`);
});
