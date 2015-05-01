//Parent Search Component
var Search = React.createClass({
	getInitialState: function(){
		return {data: this.props.data};
	},
	updateFilter: function(filterValue){
		var initialData = this.props.data;

		//Filter the collection based on the filter value
		var results = initialData.filter( function(obj) {
            return ~obj.get('body').toLowerCase().indexOf(filterValue) || ~obj.get('title').toLowerCase().indexOf(filterValue);
            
        });
		
		//Set the new state 		
		this.setState({
			data: results
		});
	},
	getUpdatedList: function(){
		var newPosts = this.props.refresh();
		this.setState({
			data: newPosts
		});
	},
	componentDidMount: function(){
		setInterval(this.getUpdatedList, 4000);
	},
	render: function(){
		return (
			<div className="search">
				<SearchBox filter={this.updateFilter} />
				<ResultsList alert={this.props.alert} data={this.state.data} />
			</div>
			);
	}
});

//Search Box Component
var SearchBox = React.createClass({
	handleChange: function(){
		var value = this.refs.query.getDOMNode().value;
		this.props.filter(value);
	},

	render: function(){
		return (<input type="text" placeholder="Filter List" ref="query" onChange={this.handleChange} />);
	}
});

//Results List Component
var ResultsList = React.createClass({

	render: function(){
		var listResults = function(post){
			return (<li className="new-post">{post.get('title')}<br /><em>{post.get('body')}</em></li>);
		};

		return (<ul onClick={this.props.alert}>{this.props.data.map(listResults)}</ul>);
	
	}
});

module.exports = Search;