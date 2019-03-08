var path = require('path')
var fs = require('fs')
var mergeOptions = require('merge-options')
var shelljs = require('shelljs')

module.exports = function (configFile, localConfigFile) {
    configFile = path.normalize(configFile || path.join(shelljs.pwd().toString(), './aluminum.json'))
    localConfigFile = path.normalize(localConfigFile || path.join(shelljs.pwd().toString(), './aluminum.local.json'))
    var defaultConfigFile = path.normalize(path.join(__dirname, '../default.aluminum.json'))
    var config = require(defaultConfigFile)

    try {
        fs.accessSync(configFile)
        config = mergeOptions(config, require(configFile))
    } catch (e) {
        console.log("Could not access aluminum.json in your project directory. Using the defaults.")
        console.log(e)
    }

    try {
        fs.accessSync(localConfigFile)
        config = mergeOptions(config, require(localConfigFile))
    } catch (e) {
        // Ignore any issues loading the local config file.
    }

    return config
}
