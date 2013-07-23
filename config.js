var httpConfig = {};

httpConfig.ipaddress  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
httpConfig.port       = process.env.OPENSHIFT_NODEJS_PORT || 4711;

exports.httpConfig = httpConfig;