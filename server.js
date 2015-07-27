/**
 * Created by alexconway on 29/06/15.
 */
var express = require('express');
var app = express();
var pg = require('pg');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var conString = "postgres://www:delphi2006@localhost/blog";

app.use(express.static(__dirname + '/build'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8000);
console.log("App listening on port 80");

app.get('/posts/:id', function(req, res){
    pg.connect(conString, function(err, client, done) {
        if(err){
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT "PostID", "Subject", "Content" FROM "Posts" WHERE "PostID" = $1', req.params.id, function(err, result){
            done();
            if(err){
                return console.error('error running query', err);
            }
            res.json(result.rows[0]);
        });
    });
});

app.get('/posts', function(req, res) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT "PostID", "Subject", "Content" FROM "Posts"', function (err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            res.json(result.rows);
        });
    });
});

app.post('/posts', function(req, res) {
    var subject = req.body.subject,
        content = req.body.postContent;

    pg.connect(conString, function(err, client, done) {
        if(err){
            return console.error('error fetching client from pool', err);
        }
        client.query('INSERT INTO "Posts" ("Subject", "Content") VALUES ($1, $2)', [subject, content], function(err){
            done();
            if(err){
                res.status(500).send();
                return console.error('error running query', err);
            } else {
                res.status(200).send();
            }
        });
    });
});


