/**
 * Created by alexconway on 31/07/15.
 */
var localStrategy = require('passport-local').Strategy;
var pg = require('pg');
var config = require('./config.json');

module.exports = new localStrategy(
    function(username, password, done) {
        if (username === "admin" && password === "admin")
            return done(null, {name: "admin"});

        return done(null, false, { message: 'Incorrect username.'});
    }
);