var jwt = require('jsonwebtoken');
var RefreshToken = require('../models/refreshToken');

async function newRefreshToken (userData) {


    const newToken = jwt.sign(
        {email_id: userData.email},
        process.env.REFRESH_TOKEN_KEY,
        {
          expiresIn: "365d",
        }
      );

      const newRefreshToken = await RefreshToken.create({
        refreshToken: newToken,
        email: userData.email, 
        tenant_id: userData.tenant_id,
      });
      newRefreshToken;
      return newToken;
}

function newAccessToken(userData){

  const newAccessToken = jwt.sign(
    {email_id: userData.email},
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );

  return newAccessToken;

}

module.exports = {newRefreshToken, newAccessToken}