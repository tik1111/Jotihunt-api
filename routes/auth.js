//require("../config/database").connect();
require("dotenv").config();

var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user/user');
var Role = require("../models/user/userRoles");
var tokenLogic = require('../logic/tokenLogic');
const refreshToken = require("../models/refreshToken");



/* GET users listing. */


router.post("/login", async (req, res) => {

    try {
      // Get user input
      const { email, password } = req.headers;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");

      }
      var  encryptedPassword = await bcrypt.hash(password,10);

      // Validate if user exist in our database
      const user = await User.findOne({ email });
    
      if (user && await bcrypt.compare(password, user.password)) {
        
        // user
        
        let accessToken =  tokenLogic.newAccessToken(email, user.id, );
        let refreshToken = await tokenLogic.newRefreshToken(email,user.id, user.tenant_id);

        user.token = accessToken;
        user.refreshtoken = refreshToken;

       
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

    //Create user Role default as User
    await Role.create({
      tenant_id: "TestTenant",
      user_id:user.id,
      role:"user"
    });

      let newAccessToken = await tokenLogic.newAccessToken(user.email, user.id);
      let newRefreshToken = await tokenLogic.newRefreshToken(user.email, user.id, user.tenant_id);

      user.token = newAccessToken;
      user.refreshtoken = newRefreshToken;
      
    // return new user
    return res.status(201).json(user.token +" ------- " +  user.refreshtoken);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

router.put('/role', async(req,res)=>{

});

router.delete('/user/user:id',async function(req, res) {
  console.log(req.params.id);
  var id = req.params.id.toString();
  try{
    if(req.params.id){
      var queryUser = await User.findOne({_id:req.params.id});
      if (queryUser){
        await Role.findOneAndDelete({user_id:req.params.id});
        await refreshToken.deleteMany({user_id:{$eq:id}});
        await User.deleteOne(queryUser);
        return res.status(201).json("User deleted");
      }
    }
    return res.status(400).json("User not deleted");  
  }catch{
    return res.status(400).json("User not deleted");
  }

});




module.exports = router;
