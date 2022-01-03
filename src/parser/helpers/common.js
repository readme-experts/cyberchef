'use strict';

function arrayFromLength(number) {
  return Array.from(new Array(number).keys()).map(k => k+1)
}

module.exports = {
  arrayFromLength,
};
