var express = require('express');
var router = express.Router();
var areaStatus = require('../models/aeraStatus');
const authorization = require("../middleware/roleAuthorisation");
const aeraStatus = require('../models/aeraStatus');

/* GET home page. */
router.get('/',async function (req, res, next,) {
    try{
        var allAreaStatus = await areaStatus.find();
        return res.status(200).json(allAreaStatus);
    }catch{
        return res.status(400).json("Could not GET area status");
    }


});

router.post('/', authorization("platform-admin") ,async function(req, res, next) {
    try{
        const areaStatusListInJSON = JSON.parse(req.body['data']);
        await areaStatus.deleteMany();
        var arr = await areaStatusListInJSON.data
        for (var i = 0; i < arr.length; i++){
            var obj = arr[i];
             await aeraStatus.findOneAndUpdate(
                {name: obj.name}, 
                {$set: {name:obj.name,status: obj.status, updated_at: obj.updated_at}},
                {
                    new: true,
                    upsert: true 
                  }
            );
        }
        return res.status(200).json("Update Succesfull"); 
    }catch(error){
        return res.status(400).json(error);
    }
    
});

module.exports = router;
