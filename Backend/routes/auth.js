const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ThisIsAJWTSecretString*&^%$#@!";
const fetchUser = require('../middleWare/fetchUser')
router.post(
  "/newuser",
  [
    body("Email", "please enter a valid email").isEmail(),
    body("Password", "password must be 6 characters long").isLength({ min: 6 }),
    body("Name", "enter a valid name").isLength({ min: 2 }),
  ],
  async (req, res) => {
    let success = false;
    // create a user using post: '/api/auth/'
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success,errors: errors.array() });
    }
    try {
      let user = await User.findOne({ Email: req.body.Email });
      if (user) {
        res
          .status(400)
          .json({success,  msg: "sorry a user with this email already exists" });
      } else {
        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.Password, salt);
        user = await User.create({
          Name: req.body.Name,
          Password: secPass,
          Email: req.body.Email,
        });
        let data = {
          user: {
            id: user.id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success,  authToken });

      }
    } catch (error) {
      
      console.error(error.message);
      res.status(500).json({success,  error: "Internal server error" });
    }
  }
);
// authenticate a user
router.post(
  "/login",
  [
    body("Email", "please enter a valid email").isEmail(),
    body("Password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, msg:"Email or Password Invalid",   errors: errors.array() });
    }
    let { Email, Password } = req.body;
    try {
      let user = await User.findOne({ Email });
      if (!user) {
        return res.status(400).json({
          success, 
          msg: "please try to login with correct Email and Password",
        });
      }

      const PasswordComp = await bcrypt.compare(Password, user.Password);

      if (!PasswordComp) {
        return res.status(400).json({
          success, 
          msg: "please try to login with correct Email and Password",
        });
      }
      let data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.status(200).json({success,  authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({success,  error: "Internal Server Error" });
    }
  }
);

// Route 3: get loged in user details
router.post("/getuser", fetchUser, async (req, res) => {
  let success = false;
  try {
    let userid = req.user.id;
    let user = await User.findById(userid).select('-Password');
    success = true;
    res.status(200).json({success, user});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({success,  error: "Internal Server Error" });
  }
});
module.exports = router;
