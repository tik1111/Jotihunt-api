var jwt = require('jsonwebtoken');

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

module.exports = { newAccessToken}