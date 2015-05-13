var http = require('http');
var express = require('express');
var app = express();

var Twit = require('twit');

var config = {};
config.twitter = {};
config.twitter.consumerKey = '77DLzH2fkahdrR0K68FLEJdyn';
config.twitter.consumerSecret = 'eRuKVzv96eHUZJfw0uIEDHERZfhUv26OVHWFSGWPXehsCq90mh';
config.twitter.accessToken = '1317434858-rGGymTctTHsMhd9gutJ65PVeiLZTOVoMFCmw1OA';
config.twitter.accessTokenSecret = 'PvWvzMyCojDUxSX3Ak45Q3AE70dQYBy8uaX0EDsyhRHx3';


var T = new Twit({
  consumer_key: config.twitter.consumerKey,
  consumer_secret: config.twitter.consumerSecret,
  access_token: config.twitter.accessToken,
  access_token_secret: config.twitter.accessTokenSecret
});

var server = http.createServer(app).listen(3000, function() {
    console.log('Express server listening on port ' + 
    3000);
});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var io = require('socket.io')(server);
var stream = T.stream('statuses/sample')

io.on('connection', function (socket) {
	console.log('Socket Connected..');
  	stream.on('tweet', function(tweet) {
  		console.log("Tweet!",tweet);
    socket.emit('info', { tweet: tweet});
  });
});