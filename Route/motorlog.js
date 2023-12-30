import express from "express";
import bodyparser from "body-parser";
import sequelize from "../config/connectdb.js";
import moment from "moment";
const route = express.Router();
route.use(bodyparser.urlencoded({ extended: false }));
route.use(express.json());
import { Sequelize, Model, DataTypes } from "sequelize";

const log = sequelize.define("Log", {
  time: DataTypes.TEXT,
  Status: DataTypes.TEXT,
  motorId: DataTypes.TEXT,
});

(async () => {
  await sequelize.sync({ force:true});
})();
route.get("/save",async (req, res) => {
  console.log(req.query);
  console.log('kkll '+moment().format("lll"));
  const resp = await log.create({
    ...req.query,
    time:''+moment().locale('TH').format("lll"),
  })
  await resp.save();
  res.send(resp);
});

route.get("/report", async (req, res) => {
  console.log(req.query);
  const resp = await log.findAll({ attributes: ['motorId','Status','time'], order: [["createdAt", "DESC"]] });
  res.send(resp);
});

export default route;
