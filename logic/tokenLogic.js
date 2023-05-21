var jwt = require('jsonwebtoken');
var RefreshToken = require('../models/refreshToken');
const user = require('../models/user/user');

async function newRefreshToken (email, user_id, tenant_id) {

    const newToken = jwt.sign(
        {email_id: email, user_id: user_id},
        process.env.REFRESH_TOKEN_KEY,
        {}
      );

      const newRefreshToken = await RefreshToken.create({
        refreshToken: newToken,
        email: email, 
        tenant_id: tenant_id,
        user_id: user_id
      });
      newRefreshToken;
      return newToken;
}

function newAccessToken(email,user_id){
  if (email != "" || user_id != ""){
    const newAccessToken = jwt.sign(
      {email_id: email, user_id:user_id},
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "1d",
      }
      
    );
    newAccessToken;
    return newAccessToken;
  }
  
}

module.exports = {newRefreshToken, newAccessToken}