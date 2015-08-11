/**
 * Created by alexconway on 03/08/15.
 */
var express = require('express');
var pg = require('pg');
var passport = require('passport');
var config = require('./config.json');
var bcrypt = require('bcrypt');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartyMiddleware = multipart({autoFiles: true, uploadDir: 'attachments/'});

module.exports = (function(){
    'use strict';
    var api = express.Router();
    var conString = config.conString;

    var auth = function(req, res, next) {
        if (!req.isAuthenticated())
            res.status(401).send();
        else
            next();
    };

    api.get('/posts/:id', function(req, res){
        pg.connect(conString, function(err, client, done) {
            if(err){
                return console.error('error fetching client from pool', err);
            }
            client.query('SELECT "PostID", "Subject", "Content" FROM "Posts" WHERE "PostID" = $1'
                    , req.params.id, function(err, result){
                done();
                if(err){
                    return console.error('error running query', err);
                }
                res.json(result.rows[0]);
            });
        });
    });

    api.get('/posts', function(req, res) {
        pg.connect(conString, function (err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }
            client.query('SELECT "p"."PostID", "Subject", "Content", ARRAY["Path"] As "Paths" FROM "Posts" AS "p" ' +
                'LEFT JOIN "Attachments" AS "a" ON "a"."PostID" = "p"."PostID" ORDER BY "PostID" DESC',
                function (err, result) {
                done();
                if (err) {
                    return console.error('error running query', err);
                }
                res.json(result.rows);
            });
        });
    });

    api.post('/posts', auth, function(req, res) {
        var subject = req.body.subject,
            content = req.body.postContent,
            paths = [];
        if (typeof req.body.paths === 'string'){
            paths = [ req.body.paths ];
        } else {
            paths = req.body.paths;
        }

        pg.connect(conString, function(err, client, done) {
            if(err){
                return console.error('error fetching client from pool', err);
            }
            client.query('INSERT INTO "Posts" ("Subject", "Content") VALUES ($1, $2) RETURNING "PostID"'
                    , [subject, content], function(err, result){
                done();
                if(err){
                    res.status(500).send();
                    return console.error('error running query', err);
                } else {
                    if (paths != null) {
                        for (var i = 0; i < paths.length; i++) {
                            client.query('INSERT INTO "Attachments" ("PostID", "Path") VALUES ($1, $2)'
                                , [result.rows[0].PostID, paths[i]], function (err) {
                                    done();
                                    if (err) {
                                        res.status(500).send();
                                        return console.error('error running query', err);
                                    } else {
                                        return res.status(200).send();
                                    }
                                })
                        }
                    }
                    return res.status(200).send();
                }
            });
        });
    });

    api.post('/attachment', auth, multipartyMiddleware, function(req, res) {
        console.log(req.body, req.files);
        res.status(200).send(req.files.file.path);

    });

    api.post('/signup', function(req, res){
        var username = req.body.username;
        var password = req.body.password;

        bcrypt.genSalt(10, function(err, salt){
           bcrypt.hash(password, salt, function(err, hash){
               console.log(req.body);
               pg.connect(conString, function(err, client, done) {
                   if (err) {
                       return console.error('error fetching client from pool', err);
                   }
                   client.query('INSERT INTO "Users" ("Username", "Password") VALUES ($1, $2)'
                       , [username, hash], function(err){
                           done();
                           if(err){
                               res.status(500).send();
                               return console.error('error running query', err);
                           } else {
                               res.status(200).send();
                           }
                       });
               });
           })
        });
    });

    api.get('/loggedin', function(req, res){
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    api.post('/login', passport.authenticate('local'), function(req, res){
        res.send(req.user);
    });

    api.post('/logout', function(req, res){
        req.logOut();
        res.status(200).send();
    });

    return api;
})();