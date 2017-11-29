var mongoose = require('mongoose');
var Arduino = mongoose.model('User');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.UserListById = function(req,res){
    Arduino
        .find()
        .exec(function(err, user) {
            if (!user) {
                sendJsonResponse(res, 404, {
                    "message": "users not found"}
                    );
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, user);
        });
}


module.exports.UserReadOne = function(req, res) {
    if (req.params && req.params.userid) {
        Arduino
            .findById(req.params.userid)
            .exec(function(err, user) {
                console.log("where is");
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "userid not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, user.Token);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No userid in request"}
            );
    }
};

module.exports.UserCreate = function(req, res) {

       Arduino.create({
	    lat:req.body.lat,
    	lon:req.body.lon,
        alt:req.body.alt,
        vel:req.body.vel,
        Hora:req.body.hora

    }, function(err,userB){
        if(err){
            console.log(err);
            sendJsonResponse(res,400,err);
        }else {
            console.log(userB);
            sendJsonResponse(res,201,userB);
        }
    });
};
