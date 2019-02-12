const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const keys = require('./keys');
const request = require('request')
const axios = require('axios');

passport.use(
	new TwitterStrategy({
		consumerKey: keys.twitter.consumer_key,
		consumerSecret: keys.twitter.consumer_secret,
		callbackURL: "http://localhost:3000/auth/twitter/return",
		passReqToCallback: true
	},
	function(req, token, tokenSecret, profile, cb) {
        request.post( {
            url : 'http://localhost:8080/api/triggers/twitter/connect',
            headers : {
                "Authorization" : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImN5cmlsIiwidXNlcklkIjoiNWM2MmE0ZDllY2NkZDNhOTRmMTZlMTgwIiwiaWF0IjoxNTQ5OTY4NjE0LCJleHAiOjE1NTAwMDQ2MTR9.YPqg3GjBbbFi1OPTb8pLZBaw_nX1nWtjujBeSs2LB5k'
            },
            form : {
                token: token,
                token_secret: tokenSecret
            }
          }, function(error, response, body) {
              console.log(body);
              console.log(response.statusCode);
          } );
        return cb(null, req.user);
	}));