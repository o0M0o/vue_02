const _ = require('lodash')
const config = require('./config')
const bunyan = require('bunyan')
const _hub = {}

var options = {
  level: config.level || bunyan.INFO
}

if (config.path) {
  _.extend(options, {
    streams: [{
      type: 'rotating-file',
      path: config.path,
      period: '1d'
    }]
  })
}

export default {
  get(name) {
    if (!_hub[name]) {
      _hub[name] = bunyan.createLogger(_.extend({
        name: name
      }, options))
    }

    return _hub[name]
  }
}
