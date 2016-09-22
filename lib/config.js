/**
 * Created by BMcClure on 9/22/2016.
 */
var path = require('path');
var fs = require('fs');
var deepAssign = require('deep-assign');

module.exports = function (configFile) {
    configFile = path.normalize(configFile || './config.json');
    var defaultConfigFile = path.join(__dirname + '../default.config.json');

    var config = {};

    if (fs.exists(defaultConfigFile)) {
        config = deepAssign(config, require(defaultConfigFile));
    }

    if (fs.exists(configFile)) {
        config = deepAssign(config, require(configFile));
    }

    return config;
};
