/**
 * Created by alexconway on 29/06/15.
 */
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var session = require('express-session');
var local = require('./passportLocal');
var api = require('./api.js');

passport.use(local);

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
   done(null, user);
});

//app.use(express.static(__dirname + '/build'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(session({ secret: 'super secret',
    resave: false,
    saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use("/js", express.static(__dirname + "/build/js"));
app.use("/css", express.static(__dirname + "/build/css"));
app.use("/img", express.static(__dirname + "/build/img"));
app.use("/attachments", express.static(__dirname + "/attachments"));
app.use("/partials", express.static(__dirname + "/build/partials"));

app.use('/api', api);

app.all("/*", function(req, res, next) {
    res.sendfile("index.html", { root: __dirname + "/build" });
});

// listen (start app with node server.js) ======================================
app.listen(8000);
console.log("App listening on port 80");



