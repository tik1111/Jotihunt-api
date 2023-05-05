require("../config/database").connect();
require("dotenv").config();
var express = require('express');
var router = express.Router();

var RefreshToken = require('../models/refreshToken');
var tokenLogic = require('../middleware/tokenLogic');

router.post("/rtoken", async (req, res) => {

    try{

        const refreshToken  = req.headers["x-refresh-token"];
        
        if ((!refreshToken)) {
            res.status(400).send("refreshToken is required");
        }

        const oldToken = await RefreshToken.findOneAndDelete({ refreshToken });

        if (!oldToken) {
            return res.status(409).send("refreshToken not found");
        }

        let newRefreshToken = await tokenLogic.newRefreshToken(oldToken.email,oldToken.tenant_id);
      

        return res.status(201).json(newRefreshToken);

    }catch(e){
        console.log(e);
    }
      

});

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