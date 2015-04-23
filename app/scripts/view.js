var $ = require('jquery');
var _ = require('underscore');
var Comments = require('./Comments.react');
var Backbone = require('backbone');
Backbone.$ = $;

var View = Backbone.View.extend({
	el: '#backbone',
	events: {
	//	'click li':'alertThis'
	},
	initialize: function(){
		var self = this;
		console.log('Initialized Collection', this.collection);
		this.collection.fetch().done(function(){
			self.render();
		});

	},
	render: function(){
		var self = this;
		this.$el.html('Hello Backbone');
		
		//React.render(<Comments data={this.collection} />, document.getElementById('backbone'));
		React.render(
			React.createElement(Comments, {
			data: self.collection,
			alert: self.alertThis

		}), document.getElementById('backbone'));

		console.log('Rendering View');
		return this;
	},
	alertThis: function(e){
		//alert('You Clicked' + e.target.innerText);
		var $target = e.target;
		$target.remove();
		console.log();
	}
});

module.exports = View;