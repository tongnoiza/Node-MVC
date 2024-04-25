import express from "express";
import bodyparser from "body-parser";
import sequelize from "../config/connectdb.js";
import moment from "moment";
const route = express.Router();
route.use(bodyparser.urlencoded({ extended: false }));
route.use(express.json());
import { Sequelize, Model, DataTypes } from "sequelize";

// const result = date.toLocaleDateString('th-TH', {
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
//   hour:'2-digit',
//   minute:'2-digit',
//   second:'2-digit'
// })
const log = sequelize.define("Log", {
  time: DataTypes.TEXT,
  Status: DataTypes.TEXT,
  motorId: DataTypes.TEXT,
});

// (async () => {
//   await sequelize.sync({ force:true});
// })();
const date = new Date();
const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
console.log('เวลาไทย ',date.toLocaleTimeString('th-TH', options));
// const dmy = new Date()
// const date = new Date(dmy.getFullYear(), dmy.getMonth(), dmy.getDate(),dmy.getHours().toLocaleString('th-TH'),dmy.getMinutes(),dmy.getSeconds())
// console.log('date.toLocaleString(th-TH) ',date.toLocaleString('th-TH')); 
// date.toUTCString()
route.get("/save",async (req, res) => {
  console.log('params ',req.query);
   const resp = await log.create({
    ...req.query,
    time:date.toLocaleString('th-TH')
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
