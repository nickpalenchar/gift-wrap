let fs = require('fs');

let options = null;

try {
  if(fs.statSync('/usr/local/giftwrap/options.json')) {
    options = require('/usr/local/giftwrap/options');
  }
  else options = require('../var/defaultOptions');
}
catch (e) {
  options = require('../var/defaultOptions');
}

module.exports = options;