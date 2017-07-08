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
                sendJsonResponse(res, 200, {token:user.CUI});
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No userid in request"}
            );
    }
};

module.exports.UserCreate = function(req, res) {

       Arduino.create({
	CUI:req.body.CUI,
    	Name:req.body.Name,

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

		post.CUI=req.body.CUI;	
	    	post.Name=req.body.Name;
                
		post.save(function(err, userB) {
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
