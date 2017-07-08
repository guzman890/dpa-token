var mongoose = require( 'mongoose' );
mongoose.Promise = require('bluebird');
require('./user');


var dbURI = 'mongodb://localhost/ArduinoDPA';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
console.log('Mongoose disconnected');
});

var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

//CUANDO SE REINICIA NODEMON
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
//CUANDO TERMINA LA APLICACION
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

//PARA LATERMINACIONDE APP HEROKU
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});
