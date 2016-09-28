/**
 * Created by BMcClure on 9/22/2016.
 */
var path = require('path');
var fs = require('fs');
var deepAssign = require('deep-assign');
var shelljs = require('shelljs');

module.exports = function (configFile) {
    configFile = path.normalize(configFile || path.join(shelljs.pwd().toString(), './aluminum.json'));
    var defaultConfigFile = path.normalize(path.join(__dirname, '../default.aluminum.json'));

    var config = require(defaultConfigFile);

    try {
        fs.accessSync(configFile);
        config = deepAssign(config, require(configFile));
    } catch (e) {
        console.log("Could not access aluminum.json in your project directory. Using the defaults.");
        console.log(e);
    }

    return config;
};
