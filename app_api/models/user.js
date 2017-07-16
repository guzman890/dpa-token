var mongoose = require( 'mongoose' );

//User
var UserSchema = new mongoose.Schema({
    CUI:{type:Number, required:true, size:8},
    Name:{type:String, required:true},
    Token:{type:String, required:true, size:6}

});

mongoose.model('User', UserSchema)
