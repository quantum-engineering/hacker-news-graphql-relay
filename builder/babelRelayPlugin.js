var getBabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../schema/hacker-news.json');
var plugin = getBabelRelayPlugin(schema.data);

module.exports = plugin
