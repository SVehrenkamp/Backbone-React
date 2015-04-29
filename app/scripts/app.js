//React Component
var React = window.React = require('react'),
    Collection = require('./collection'),
    View = require('./view');
    
var collection = new Collection();
var view = new View({collection: collection});

