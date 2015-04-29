
var Comments = React.createClass({
	
	render: function(){
		var getComment = function(title){
			return (<li>{title.get('title')}<br /><em>{title.get('body')}</em></li>);
		};

			console.log(this.props);
		return (<ul onClick={this.props.alert}>{this.props.data.map(getComment)}</ul>);
	
	}
});

module.exports = Comments;