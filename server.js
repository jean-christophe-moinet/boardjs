#!/bin/env node
// OpenShift sample Node application

var configurator  = require('./src/config.js');
var database      = require('./src/database/database.js');
var db = new database.Database();
var server        = require('./src/web/server.js');
var webServer = new server.Server();

/**
 * Define the sample application.
 */
var SampleApp = function() {

	// Scope.
	var self = this;

	console.log ('DBurl : %s', configurator.dbConfig.dburl);

	/**
	 * Initializes the sample application.
	 */
	self.initialize = function() {		
		webServer.initialize();
		db.openConnection();
	};


	

};   /* Sample Application. */



/**
 * main(): Main code.
 */
var zapp = new SampleApp();
zapp.initialize();


