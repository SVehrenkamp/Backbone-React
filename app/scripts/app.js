//React Component
var React = window.React = require('react'),
    Timer = require("./ui/Timer"),
    Collection = require('./collection'),
    View = require('./view');
    
var collection = new Collection();
var view = new View({collection: collection});

