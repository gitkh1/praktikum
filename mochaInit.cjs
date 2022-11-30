/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const Module = require('module');

const originalRequire = Module.prototype.require;
Module.prototype.require = function fn() {
  if (arguments[0] && arguments[0].endsWith('css')) return;
  if (arguments[0] && arguments[0].endsWith('png')) return;
  return originalRequire.apply(this, arguments);
};
