var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var Collection = Backbone.Collection.extend({
	initialize: function(){
		console.log('Initialized Collection');

	},
	url: function(){
		url = "https://boiling-torch-7113.firebaseio.com/posts.json";
		return url;

	},
	parse: function(resp, options){
      var data = [];
      for(var d in resp){
        data.push(resp[d]);
      }
		console.log('COLLECTION::', data)
		return data;

	}
});

module.exports = Collection;