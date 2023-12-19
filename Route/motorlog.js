import express from "express";
import bodyparser from "body-parser";
import sequelize from "../config/connectdb.js";
import moment from "moment";

const route = express.Router();
route.use(bodyparser.urlencoded({ extended: false }));
route.use(express.json());
import { Sequelize, Model, DataTypes } from "sequelize";

const log = sequelize.define("Log", {
  motorId: DataTypes.TEXT,
  Status: DataTypes.TEXT,
  time: DataTypes.TEXT,
});

// (async () => {
//   await sequelize.sync({ force: false});
// })();

route.post("/save", async (req, res) => {
  console.log(req.query);
  const resp = await log.create({
    ...req.query,
    time:''+moment().locale("th").format("LLLL"),
  });
  await resp.save();
  res.send(resp);
});

route.get("/findall", async (req, res) => {
  console.log(req.query);
  const resp = await log.findAll({ order: [["createdAt", "DESC"]] });
  res.send(resp);
});

export default route;
