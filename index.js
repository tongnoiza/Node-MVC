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

const wss = new WebSocketServer({ noServer: true });

app.use(express.json());
app.on("upgrade", (request, socket, head) => {
  console.log({ request });
  console.log({ socket });
  console.log({ head });
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

app.use("/User", user);
app.use("/log", motorlog);

app.listen(port, () => {
  console.log(`runing at port ${port}`);
});
