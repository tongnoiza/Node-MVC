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

// (async () => {
//   await sequelize.sync({ force:true});
// })();

const date = new Date();
let [currentdate,time] = date.toLocaleString('th-TH').split(' ')
let nowtime = currentdate+' '+(+time.split(':')[0]+7) +(':'+time.split(':')[1]+':'+time.split(':')[2])

console.log('เวลาไทย ',nowtime);

route.get("/save",async (req, res) => {

  const date = new Date();
  let [currentdate,time] = date.toLocaleString('th-TH').split(' ')
let nowtime = currentdate+' '+(+time.split(':')[0]+7) +(':'+time.split(':')[1]+':'+time.split(':')[2])
  console.log('params ',req.query);
   const resp = await log.create({
    ...req.query,
    time:nowtime
  })
  await resp.save();
  res.send(resp);
});

route.get("/report", async (req, res) => {
  console.log(req.query);
  const resp = await log.findAll({ attributes: ['motorId','Status','time'], order: [["createdAt", "DESC"]] });
  res.send(resp);
});

route.get("/cleardb", async (req, res) => {
  await log.destroy({
    truncate: true
  });
  res.sendStatus(200)
});

export default route;
