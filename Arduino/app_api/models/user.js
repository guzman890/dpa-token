var mongoose = require( 'mongoose' );

//User
var UserSchema = new mongoose.Schema({
    CUI:{type:Number, required:true},
    Name:{type:String, required:true}

});

mongoose.model('User', UserSchema)
