var $ = require('jquery');
var _ = require('underscore');
var Search = require('./Search.react');
var Backbone = require('backbone');
Backbone.$ = $;

var View = Backbone.View.extend({
	el: '#backbone',
	
	initialize: function(){
		var self = this;
		
		this.collection.fetch().done(function(){
			self.render();
		});

	},
	render: function(){
		var self = this;
		
		React.render(
			React.createElement(Search, {
			data: self.collection

		}), document.getElementById('backbone'));

		return this;
	}
});

module.exports = View;