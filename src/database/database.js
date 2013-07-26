var configurator = require('../config.js');
var mongoose = require( 'mongoose' ); 

var Database = function() {

	// Scope.
	var self = this;

	console.log('creating database access');

	self.openConnection = function() {
		// Connect to database
		if (process.env.OPENSHIFT_MONGODB_DB_HOST) {
			mongoose.connect(configurator.dbConfig.dburl,
					configurator.dbConfig.dbOptions);
		} else {
			mongoose.connect(configurator.dbConfig.dburl);
		}
	};
};

exports.Database = Database;
