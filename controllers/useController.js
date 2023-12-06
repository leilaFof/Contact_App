const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { use } = require("../routes/userRoute");

///register user post

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All field are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  //si le email existe deja on envoie sa
  if (userAvailable) {
    res.status(400).json({
      error: "Email already register",
    });
  }

  //hash password

  const hashpassword = await bcrypt.hash(password, 10);
  console.log("hash password", hashpassword);
  //create a new user
  const user = await User.create({
    username,
    email,
    password: hashpassword,
  });
  console.log(`User created succes${user}`);

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    return res.status(400).send("User data is not valide");
  }

  // res.json({

  //     message:"register is ok"
  // })
});

//login user post
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }
  const user = await User.findOne({ email });
  //comapre password with has password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCES_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    console.log(use);

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valide");
  }
  //   res.json({
  //     message: "login is ok",
  //   });
});

//current user get
const current = asyncHandler(async (req, res) => {
//   const user = await User.find();
  res.json(req.user);
});

module.exports = {
  register,
  login,
  current,
};
