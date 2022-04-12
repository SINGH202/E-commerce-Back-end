const router = require("express").Router();
const User = require("../models/User");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register

// mongodb+srv://singh202:<password>@cluster0.bxefk.mongodb.net/test

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: cryptoJS.AES.encrypt(
      req.body.password,
      "hjvjkghhvh"
    ).toString(),
  });

  try {
    const saveduser = await newUser.save();
    res.status(200).json(saveduser);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong Credentials!");

    // console.log(user.password)
    const hashedPassword = cryptoJS.AES.decrypt(
      user.password,
      "hjvjkghhvh"
    );

    const orignalPassword = hashedPassword.toString(cryptoJS.enc.Utf8);

    orignalPassword !== req.body.password &&
      res.status(401).json("Wrong Credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      "JHDGVUHIVJGNFVBEVCTRUYKTC7IV",
      {expiresIn:"3d"}
    );

    const { password, ...others } = user._doc;

    res.status(200).json({...others, accessToken});
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
