'use strict'

const beautify = require("json-beautify");

function fix (json) {
  return beautify(json, null, 2, 80);
}

module.exports = {
  fix,
}