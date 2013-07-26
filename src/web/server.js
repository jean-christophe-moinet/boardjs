var express = require('express');
var fs = require('fs');
var configurator = require('../config.js');
var routerModule = require ('./router.js');
var cacheModule = require('./cache.js');

var Router = new routerModule.Router();
var Cache = new cacheModule.Cache();

var Server = function() {

    // Scope.
    var self = this; 

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

    self.initializeServer = function() {
	Router.createRoutes();
	self.app = express.createServer();

	for ( var r in Router.routes) {
	    console.log('Creating route for %s', r);
	    self.app.get(r, Router.routes[r]);
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
	Cache.populateCache();
	self.setupTerminationHandlers();

	self.initializeServer();
	self.start();
    };
};

exports.Server = Server;
