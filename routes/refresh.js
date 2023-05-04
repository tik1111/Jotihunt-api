require("../config/database").connect();
require("dotenv").config();
var express = require('express');
var router = express.Router();

var RefreshToken = require('../models/refreshToken');
var tokenLogic = require('../backend/jwt');

router.post("/", async (req, res) => {

    try{

        const refreshToken  = req.headers["x-refresh-token"];
        
        if ((!refreshToken)) {
            res.status(400).send("refreshToken is required");
        }

        const oldToken = await RefreshToken.findOneAndDelete({ refreshToken });

        if (!oldToken) {
            return res.status(409).send("refreshToken not found");
        }

        let newRefreshToken = await tokenLogic.newRefreshToken(oldToken);
      

        return res.status(201).json(newRefreshToken);

    }catch(e){
        console.log(e);
    }
      

});


module.exports = router;