var httpConfig = {};

httpConfig.ipaddress = process.env.OPENSHIFT_NODEJS_IP || "localhost";
httpConfig.port = process.env.OPENSHIFT_NODEJS_PORT || 4711;

var dbConfig = {};

dbConfig.dbaddress = process.env.OPENSHIFT_MONGODB_DB_HOST || "localhost";
dbConfig.dbport = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017;
dbConfig.dbname = "boardjs";
dbConfig.dburl = 'mongodb://' + dbConfig.dbaddress + ':' + dbConfig.dbport	+ '/' + dbConfig.dbname;
dbConfig.dbOptions = {
	user : 'admin',
	pass : 'D4Rx8ZUdDXvZ'
};

exports.httpConfig = httpConfig;
exports.dbConfig = dbConfig;