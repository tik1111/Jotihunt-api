const jwt = require("jsonwebtoken");
var Role = require("../models/userRoles");
const config = process.env;
const tenantAdmin = role  => {return async (req, res, next) => {
    try {

      const userRoleType = {
        user: 'user',
        tenantAdmin: 'tenant-admin',
        platformAdmin: 'platform-admin'
    }

      if (req.headers["x-access-token"]) {
        const token = req.headers["x-access-token"];


        try {
          const decoded = jwt.verify(token, config.ACCESS_TOKEN_KEY);
          req.user_id = decoded;
          //! find right user.

          const findRole = await Role.findOne({user_id: decoded.user_id});
          if(findRole == null){
            return res.status(401).send("No auth state");
          }

          switch(role){
            case "user":
              if(findRole.role == userRoleType.user || findRole.role == userRoleType.tenantAdmin|| findRole.role == userRoleType.platformAdmin){
                return next();
                
              }else{
                break;
              }
              
            case "tenant-admin":
              if(findRole.role == userRoleType.tenantAdmin || findRole.role == userRoleType.platformAdmin){
                return next();
                
              }else{
                break;
              }
            case "platform-admin":
              if(findRole.role == userRoleType.platformAdmin){
                return next();
              }else{
                break;
              }
            default:
              return res.status(401).json({
                message: "Required role not found" 
              });

          }
          
          return res.status(401).send("Invalid token or user role");
        } catch (err) {
          return res.status(401).send("Invalid Token");
        }


        
      } else {
        return res.status(401).json({
          message: "Access token required" 
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({  
        message: "autorization failed",
      });
    }
  };
  
  };

  module.exports = tenantAdmin;