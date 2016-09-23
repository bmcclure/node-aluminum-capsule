/**
 * Created by BMcClure on 9/22/2016.
 */
var path = require('path');
var fs = require('fs');
var deepAssign = require('deep-assign');

module.exports = function (configFile) {
    configFile = path.normalize(configFile || './config.json');
    var defaultConfigFile = path.join(__dirname, '../default.config.json');

    var config = require(defaultConfigFile);

    try {
        fs.accessSync(configFile);
        config = deepAssign(config, require(configFile));
    } catch (e) {
        // Didn't work, we'll just use the defaults.
    }

    return config;
};
