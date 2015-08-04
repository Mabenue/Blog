/**
 * Created by alexconway on 31/07/15.
 */
var localStrategy = require('passport-local').Strategy;
var pg = require('pg');
var config = require('./config.json');
var bcrypt = require('bcrypt');

var strategy = new localStrategy(
    function(username, password, done) {

        getAuthorization(username, password, function(res){
            if (res == true)
                return done(null, {name: "admin"});
            else
                return done(null, false, { message: 'Incorrect username.'});
        });

    }
);

var getAuthorization = function(username, password, callback){
    pg.connect(config.conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT "Username", "Password" FROM "Users" WHERE "Username" = $1'
            , [username], function(err, result){
                done();
                if(err){
                    return console.error('error running query', err);
                }
                var hash = result.rows[0].Password;
                bcrypt.compare(password, hash, function(err, res) {
                    callback(res);
                });
            });
    });
};

module.exports = strategy;