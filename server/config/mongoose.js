console.log('mongoose.js loading..');

var mongoose      =     require('mongoose');
var fs            =     require('fs');
var path          =     require('path');
var dburi         =     'mongodb://localhost/blackbelt_success';
var root          =     __dirname;
var models_path   =     path.join(root, './../models');
var reg           =     new RegExp( ".js$", "i" );

/*
* Connect to the database
*/
mongoose.connect( dburi );
/*
*  CONNECTION EVENTS
*  When successfully connected
*/
mongoose.connection.on( 'connected', function () {
  console.log( `Mongoose default connection open to ${ dburi }` );
});
/*
*  If the connection throws an error
*/
mongoose.connection.on( 'error', function ( err ) {
  console.error( `Mongoose default connection error: ${ err }` );
});
/*
*  When the connection is disconnected
*/
mongoose.connection.on( 'disconnected', function () {
  console.log( 'Mongoose default connection disconnected' );
});
/*
*  If the Node process ends, close the Mongoose connection
*/
process.on( 'SIGINT', function() {
  mongoose.connection.close( function () {
    console.log( 'Mongoose default connection disconnected through app termination' );
    process.exit( 0 );
  });
});
/*
*  Load Models: read all of the files in the models dir and
*  check if it is a javascript file before requiring it
*/
fs.readdirSync( models_path ).forEach( function( file ) {
  if( reg.test( file ) ) {
    require( path.join( models_path, file ) );
  }
});
