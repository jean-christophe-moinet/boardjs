var express = require('express');
var fs = require('fs');
var configurator = require('../config.js');

var Server = function() {

    // Scope.
    var self = this;

    self.setupVariables = function() {
	console.log('Port : %s', configurator.httpConfig.port);
	console.log('IP address : %s', configurator.httpConfig.ipaddress);
    };

    self.populateCache = function() {
	if (typeof self.zcache === "undefined") {
	    self.zcache = {
		'index.html' : ''
	    };
	}

	// Local cache for static content.
	self.zcache['index.html'] = fs.readFileSync('index.html');
    };

    self.cache_get = function(key) {
	return self.zcache[key];
    };

    self.terminator = function(sig) {
	if (typeof sig === "string") {
	    console.log('%s: Received %s - terminating sample app ...', Date(Date.now()), sig);
	    process.exit(1);
	}
	console.log('%s: Node server stopped.', Date(Date.now()));
    };

    self.setupTerminationHandlers = function() {
	// Process on exit and signals.
	process.on('exit', function() {
	    self.terminator();
	});

	[ 'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2',
		'SIGTERM' ].forEach(function(element, index, array) {
	    process.on(element, function() {
		self.terminator(element);
	    });
	});
    };

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
	    res.send(self.cache_get('index.html'));
	};
    };

    self.initializeServer = function() {
	self.createRoutes();
	self.app = express.createServer();

	for ( var r in self.routes) {
	    self.app.get(r, self.routes[r]);
	}
    };

    /**
     * Start the server (starts up the sample application).
     */
    self.start = function() {
	self.app.listen(configurator.httpConfig.port, configurator.httpConfig.ipaddress, function() {
	    console.log('%s: Node server started on %s:%d ...', Date(Date.now()), configurator.httpConfig.ipaddress,
		    configurator.httpConfig.port);
	});
    };

    self.initialize = function() {
	self.setupVariables();
	self.populateCache();
	self.setupTerminationHandlers();

	self.initializeServer();
	self.start();
    };
};

exports.Server = Server;
