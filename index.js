import express from "express";
import bodyparser from "body-parser";
import user from "./Route/User.js";
import motorlog from "./Route/motorlog.js";
import cors from "cors";

import { WebSocketServer } from "ws";
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
const port = 80;
app.use(express.json());
app.use("/User", user);
app.use("/log", motorlog);
const wss = new WebSocketServer({ port: 443 });
// const wss = new WebSocketServer({ noServer: true });
app.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
wss.on("connection", function connection(ws) {
  console.log("เชื่อมต่อ");
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
    ws.send("something " + data);
  });
});

app.listen(port, () => {
  console.log(`runing at port ${port}`);
});
