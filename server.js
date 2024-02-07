const express = require("express");
const mongoose = require("mongoose");
const USER = require("./models/user");
// const user = require("./models/user.js");
require("dotenv").config();

const app = express();
mongoose
  .connect(process.env.CONCTION_STRING)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));
app.use(express.json());
// router  get all users
app.get("/users", async (req, res) => {
  try {
    const users = await USER.find();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
});
// create new user
app.post("/new-user", async (req, res) => {
  try {
    const newuser = req.body;
    const user = await USER.insertMany([newuser]);
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});
// update by user
app.put("/update-user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const user = await USER.findByIdAndUpdate({ _id: id }, updates);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete by id
app.delete("/delete-user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await USER.findByIdAndDelete({ _id: id });
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
