const express = require("express");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { userModel } = require("../models/user.model");

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const { username, avatar, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(400).send({ msg: "user already registered" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          console.log(err);
          res.status(400).send({ msg: "something went wrong" });
        } else {
          const saveUser = userModel({
            username,
            avatar,
            email,
            password: hash,
          });
          await saveUser.save();
          res.status(200).send({ msg: "registration successfull" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong" });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      console.log(user, password, user.password);
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          res
            .status(400)
            .send({ msg: "something went wrong or wrong password" });
        } else {
          const token = jsonwebtoken.sign({ user: user.email }, "blogs");
          res.status(200).send({ msg: "login successfull", token, user });
        }
      });
    } else {
      res.status(404).send({ msg: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong" });
  }
});

module.exports = { userRoute };
