import express from "express";
import bodyparser from "body-parser";
import sequelize from "../config/connectdb.js";
const route = express.Router();
route.use(bodyparser.urlencoded({ extended: false }));
route.use(express.json());
import { Sequelize, Model, DataTypes } from "sequelize";

const User = sequelize.define("user", {
  name: DataTypes.TEXT,
  Lastname: DataTypes.TEXT,
  age: DataTypes.TEXT,
});
// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

route.post("/insert", async (req, res) => {
  console.log(req.body);
    const user = await User.create(req.body);
    // User.increment('id', { by: 1 });
    await user.save();
    res.send(user);
  });
  
route.post("/update", async (req, res) => {
    const userid =  req.body.id
  const user = await User.update(req.body, {
    where: {
      id:userid
    }
  });
  res.send(user);
});
route.post("/delete/:id", async (req, res) => {
    const userid =  req.params.id
    console.log('userid ', userid);
  const user = await User.destroy({
    where: {
        id:userid
    }
  });
  res.sendStatus(200)
});

route.get("/findall", async (req, res) => {
  let query = await User.findAll({order: [
    ['id', 'ASC']]} 
    );
  res.send(query);
});



route.get("/findbyid/:id", async (req, res) => {
  let id = req.params.id
  let query = await User.findOne({ where: { id: id } });
  console.log(query);
  res.send(query);
});

export default route;
