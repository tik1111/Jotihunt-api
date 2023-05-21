var express = require('express');
var router = express.Router();
var group = require('../../models/participantGroup');
const authorization = require("../../middleware/roleAuthorisation")

/* GET home page. */
router.get('/',async function (req, res, next,) {
    try{
        var allGroups = await group.find();
        return res.status(200).json(allGroups);
    }catch{
        return res.status(400).json("Could not GET groups");
    }


});

router.post('/', authorization("platform-admin") ,async function(req, res, next) {
    try{
        const groupListInJSON = JSON.parse(req.body['data']);
        await group.deleteMany();
        var arr = await groupListInJSON.data
        for (var i = 0; i < arr.length; i++){
            var obj = arr[i];
             await group.findOneAndUpdate(
                {name: obj.name}, 
                {$set: {name:obj.name,accomodation: obj.accomodation, street: obj.street, housenumber:obj.housenumber, housenumber_addition: obj.housenumber_addition, postcode: obj.postcode, city: obj.city, lat: obj.lat, long: obj.long, photo_assignment_points: obj.photo_assignment_points, area: obj.area}},
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
