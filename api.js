/**
 * Created by alexconway on 03/08/15.
 */
var express = require('express');
var pg = require('pg');
var passport = require('passport');
var config = require('./config.json');

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
            client.query('SELECT "PostID", "Subject", "Content" FROM "Posts"', function (err, result) {
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
            content = req.body.postContent;

        pg.connect(conString, function(err, client, done) {
            if(err){
                return console.error('error fetching client from pool', err);
            }
            client.query('INSERT INTO "Posts" ("Subject", "Content") VALUES ($1, $2)'
                    , [subject, content], function(err){
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