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
console.log(moment().up);
(async () => {
  await sequelize.sync({ force:true});
})();
function getcurrenttime(){
  var currentdate = new Date();
  let datetext = currentdate.toTimeString();
  datetext = datetext.split(' ')[0];
  return  " " + currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + "\n"
    + datetext
}
console.log('getcurrenttime ',getcurrenttime());
route.get("/save",async (req, res) => {
  console.log('params ',req.query);
  let timestamp = moment().locale('th').format("lll").humanize(true)
  const resp = await log.create({
    ...req.query,
    time:timestamp,
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
