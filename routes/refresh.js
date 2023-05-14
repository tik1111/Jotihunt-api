require("../config/database").connect();
require("dotenv").config();
var express = require('express');
var router = express.Router();

var RefreshToken = require('../models/refreshToken');
var tokenLogic = require('../logic/tokenLogic');


router.post("/atoken", async (req, res) => {

    try{

        const refreshToken  = req.headers["x-refresh-token"];
        
        if ((!refreshToken)) {
            res.status(400).send("Refresh token is required");
        }

        const tokenVerify = await RefreshToken.findOne({ refreshToken });

        if(tokenVerify){
            let newAccessToken = tokenLogic.newAccessToken(refreshToken.email);
            return res.status(201).json(newAccessToken);
        }else{
            res.status(400).send("Token not valid");
        }

    }catch(e){
        console.log(e);
    }
     
});

module.exports = router;