var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var app = module.exports = loopback();
var request = require('request');

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

/*
* Generate Twitter Oauth Bearer Token
* Consumer Key: 77DLzH2fkahdrR0K68FLEJdyn
* Consumer Secret: eRuKVzv96eHUZJfw0uIEDHERZfhUv26OVHWFSGWPXehsCq90mh
* Request Token URL: https://api.twitter.com/oauth2/token
* Bearer Token Must Be Sent with every request to twitter.
* Bearer Token: "Bearer AAAAAAAAAAAAAAAAAAAAAAovfgAAAAAA0ja%2FDdaDH%2BSkT83AO9nWdYGb%2FKQ%3DDbAERPFBx97OE5FffntZ60m6WxG622taQ0NkX17EZvir0ikkdK";
*
*/
//App Entry Point index.html file
app.use(loopback.static(path.resolve(__dirname, '../../client')));

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
	
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

//Custom Routes
var getTwitterFeed = function(req, res, user, postCount){

  	var url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
  	var token = "Bearer AAAAAAAAAAAAAAAAAAAAAAovfgAAAAAA0ja%2FDdaDH%2BSkT83AO9nWdYGb%2FKQ%3DDbAERPFBx97OE5FffntZ60m6WxG622taQ0NkX17EZvir0ikkdK";
  	user = user || 'kingjames';
    postCount = 25;
  	var options = {url: url, qs: {screen_name: user, count: postCount}, headers: {authorization: token}};

  	//MAKE REQUEST 
  	request(options, function(err, response, body){
  		console.log('Called..');
  		if(err){
  			return "Error...";
  			console.log('Called with Error!');
  		} else{
  			//var resp = JSON.parse(body);
  			var resp = body;
  			res.write(resp);
  			res.end();
  			console.log('Called with success!');
  			return resp;
  		}
  	});
	console.log('This was called!');
	
}
//Mount middleware
app.use('/twitter', function(req, res){
	getTwitterFeed(req, res);
});