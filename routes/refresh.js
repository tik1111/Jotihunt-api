require("../config/database").connect();
require("dotenv").config();
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var RefreshToken = require('../models/refreshToken')

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

    const newToken = jwt.sign(
        {email_id: oldToken.email},
        process.env.REFRESH_TOKEN_KEY,
        {
          expiresIn: "365d",
        }
      );

      const newRefreshToken = await RefreshToken.create({
        refreshToken: newToken,
        email: oldToken.email, 
        tenant_id: oldToken.tenant_id,
      });
      

      return res.status(201).json(newRefreshToken);

    }catch(e){
        console.log(e);
    }
      

});


module.exports = router;