var express       =  require('express');
var app           =  express();
var bcrypt        =  require('bcrypt');
var bp            =  require('body-parser');
var port          =  process.env.PORT || 8000;
var path          =  require( 'path' );
var root          =  __dirname;
var session       =  require('express-session');
var bodyParser    =  require('body-parser');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUnintialized: true
}));

app.use(bp.json());

// for parsing the POST body
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(root + '/client/'));
app.use(express.static(root + '/client/static/'));
app.use(express.static(root + '/bower_components'));

app.set('views', root + '/client/static');
// set EJS as the templating engine
//app.set('view engine','ejs');

// fires up connection to db, loads models, loads model controllers
require('./server/config/mongoose.js');
//console.log('first: ',app);
require('./server/config/routes.js')(app);

// var routes_setter = require('./server/config/routes.js');
// routes_setter(app);

// BEGIN listening for requests -----------------
app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
