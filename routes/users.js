var express = require('express');
require("dotenv").config();
var router = express.Router();
var User = require('../models/user/user');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try{
    if(req.headers.tenant_id){
      const allUsers = await User.find({tenant_id:{$eq:req.headers.tenant_id}});
      if(allUsers){
        return res.status(200).json(allUsers);
      }
    }

  return res.status(400).json("No users found!");
  }catch{
    return res.status(400).json("No users found!");
  }
  
});

router.get('/user:user_id', async function(req, res, next) {
  try{
    if(req.headers.tenant_id){
      const user = await User.find({tenant_id:{$eq:req.headers.tenant_id}, _id:{$eq:req.params.user_id}});
      if(user){
        return res.status(200).json(user);
      }
    }

  return res.status(400).json("No users found!");
  }catch{
    return res.status(400).json("No users found!");
  }
  

});



module.exports = router;
