var mongoose = require( 'mongoose' );

//User
var UserSchema = new mongoose.Schema({
    lat:{
        type:String, 
        required:true
    },
    lon:{
        type:String, 
        required:true
    },
    alt:{
        type:String, 
        required:true
    },
    vel:{
        type:String, 
        required:true
    },
    Hora:{
        type:String, 
        required:true
    }
});

mongoose.model('User', UserSchema)
