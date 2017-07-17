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

module.exports.validToken = function(req, res) {
    
        var cui = req.body.CUI;
        var token = req.body.token;

       if (!req.body.CUI && !req.body.token ) {
        sendJsonResponse(res, 404, {
            "message": "Not found, userid is required"}
            );
        return;
    }

        Arduino
            .find({CUI: cui})
            .exec(function(err, user) {
                
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "userid not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                console.log("where is"+user[0]);

                if(user[0].Token == token){ 
                    user[0].Token = "*";
                    user[0].save(function(err, userB) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, {response: "ok"});
                    }
                });
                }
                else
                    sendJsonResponse(res, 200, {response: "No"});
            });

};

module.exports.UserCreate = function(req, res) {

       Arduino.create({
	    CUI:req.body.CUI,
    	Name:req.body.Name,
        Token:req.body.Token,

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

module.exports.UserUpdateOne = function(req, res) {
    if (!req.params.userid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, userid is required"}
            );
        return;
    }

   Arduino
        .findById(req.params.userid)
        .select('-comments')
        .exec(
            function(err, userB) {
                if (!userB) {
                    sendJsonResponse(res, 404, {
                        "message": "userid not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }

		    userB.CUI=req.body.CUI;	
	    	userB.Name=req.body.Name;
            userB.Token=req.body.Token;
                
		userB.save(function(err, userB) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, userB);
                    }
                });
        }
    );
};


module.exports.UserDeleteOne = function(req, res) {
    var userid = req.params.userid;

    if (userid) {
       Arduino
            .findByIdAndRemove(userid)
            .exec(
                function(err, userB) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No userid"}
            );
    }
};
