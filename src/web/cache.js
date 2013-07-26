var fs = require('fs');

var Cache = function() {

    // Scope.
    var self = this;
    var zcache={};

    self.populateCache = function() {
	if (typeof self.zcache === "undefined") {
	    self.zcache = { 'index.html' : '' };
	}

	// Local cache for static content.
	self.zcache['index.html'] = fs.readFileSync('index.html');
    };

    self.cache_get = function(key) {
	return self.zcache[key];
    };
};

exports.Cache = Cache;