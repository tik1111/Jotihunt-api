require("../config/database").connect();
require("dotenv").config();

var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var RefreshToken = require('../models/refreshToken'); 


/* GET users listing. */


router.post("/login", async (req, res) => {

    try {
      // Get user input
      const { email, password } = req.headers;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (bcrypt.compare(password, user.password))) {
        
        // user
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.ACCESS_TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );

       
        return res.status(200).json(user);
      }
      return res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  });

router.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { name, email, password } = req.headers;

    // Validate user input
    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password,10);

    // Create user in our database
    const user = await User.create({
      name: name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      tenant_id: "TestTenant"
    });

    const token = jwt.sign(
        { user_id: user._id, email },
        process.env.ACCESS_TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      const refreshToken = jwt.sign(
        { user_id: user._id, email },
        process.env.REFRESH_TOKEN_KEY,
        {
          expiresIn: "2y",
        }
      );
    
       await RefreshToken.create({
        refreshToken: refreshToken,
        email: user.email, 
        tenant_id: user.tenant_id
      });

      user.token = token;
      user.refreshtoken = refreshToken;

    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

module.exports = router;
