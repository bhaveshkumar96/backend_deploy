const express = require("express");
const { UserModel } = require("../Model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) res.send(err.message);
      else {
        const user = new UserModel({ name, email, pass: hash });
        await user.save();
        res.send({ msg: "user Registered", token: "random-token..." });
      }
    });
  } catch (error) {
    res.send({ msg: "something is wrong", erroe: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email,pass } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id}, "masai");
          res.send({ msg: "user logged in", token: token });
        } else {
          res.send({ msg: "wrong credential" });
        }
      });
    } else {
      res.send({ msg: "wrong credential" });
    }
  } catch (error) {
    res.send({ msg: "something is wrong", "error": error });
  }
});

module.exports = { userRouter };
