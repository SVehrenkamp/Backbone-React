var _ = require('underscore');

//Parent Search Component
var Search = React.createClass({
	getInitialState: function(){
		return {data: this.props.data};
	},
	updateFilter: function(filterValue){
		var initialData = this.props.data.models;

		//Filter the collection based on the filter value
		var results = _.filter(initialData, function(obj) {
            return ~obj.get('body').toLowerCase().indexOf(filterValue);
            console.log(obj);
        });
		
		//Set the new state 		
		this.setState({
			data: results
		});
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
		var listResults = function(title){
			return (<li>{title.get('title')}<br /><em>{title.get('body')}</em></li>);
		};

		return (<ul onClick={this.props.alert}>{this.props.data.map(listResults)}</ul>);
	
	}
});

module.exports = Search;