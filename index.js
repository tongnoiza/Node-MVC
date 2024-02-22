import express from "express";
import bodyparser from "body-parser";
import user from "./Route/User.js";
import motorlog from "./Route/motorlog.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
const port = 443;
app.use(express.json());
app.use("/User", user);
app.use("/log", motorlog);
app.listen(port, () => {
  console.log(`runing at port ${port}`);
});
