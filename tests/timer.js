/**
 * jazzrunner Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 *
 * https://github.com/MiguelCastillo/jazzrunner
 */


define(function(require, exports, module) {
  "use strict";

  function Timer(start) {
    if(start !== false) {
      this.start();
    }
  }

  Timer.units = {
    msec: 1,
    secs: 1000,
    mins: 1000 * 60,
    hours: 1000 * 60 * 60
  };

  Timer.prototype.start = function() {
    this._start = Date.now();
  };

  Timer.prototype.end = function() {
    this._end = Date.now();
  };

  Timer.prototype.elapsed = function(unit) {
    this.end();

    if (isNaN(unit) === true) {
      unit = Timer.units.secs;
    }

    return (this._end - this._start)/unit;
  };

  module.exports = Timer;
});

