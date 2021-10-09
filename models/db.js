const config = require('./db-config');
var MongoClient = require('mongodb').MongoClient;
const url = config.host + config.name;

module.exports.name = config.name;
module.exports = function (func){
    MongoClient.connect(url,func);
};