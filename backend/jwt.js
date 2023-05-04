async function newRefreshToken (oldToken) {
    var jwt = require('jsonwebtoken');
    var RefreshToken = require('../models/refreshToken');

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

      return newRefreshToken;
}

module.exports = {newRefreshToken}