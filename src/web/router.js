var cacheModule = require('./cache.js');
var Cache = new cacheModule.Cache();

var Router = function() {

    // Scope.
    var self = this;

    Cache.populateCache();
    
    self.createRoutes = function() {
	self.routes = {};

	// Routes for /health, /asciimo and /
	self.routes['/health'] = function(req, res) {
	    res.send('1');
	};

	self.routes['/asciimo'] = function(req, res) {
	    var link = "http://i.imgur.com/kmbjB.png";
	    res.send("<html><body><img src='" + link + "'></body></html>");
	};

	self.routes['/'] = function(req, res) {
	    res.setHeader('Content-Type', 'text/html');
	    res.send(Cache.cache_get('index.html'));
	};
    };

};

exports.Router = Router;