var jwt = require('jsonwebtoken');
var RefreshToken = require('../models/refreshToken');

async function newRefreshToken (email, tenant_id) {

    const newToken = jwt.sign(
        {email_id: email},
        process.env.REFRESH_TOKEN_KEY,
        {
          expiresIn: "365d",
        }
      );

      const newRefreshToken = await RefreshToken.create({
        refreshToken: newToken,
        email: email, 
        tenant_id: tenant_id,
      });
      newRefreshToken;
      return newToken;
}

function newAccessToken(email,_id){
  if (email != "" && _id != ""){
    const newAccessToken = jwt.sign(
      {email_id: email, user_id:_id},
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "1d",
      }
      
    );
    return newAccessToken;
  }
  

  

}

module.exports = {newRefreshToken, newAccessToken}