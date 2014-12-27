/**
 * spromise Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 */

/*global process, setImmediate*/
define(function(require, exports, module) {
  "use strict";

  var nextTick;

  function Async(cb) {
    nextTick(cb);
  }

  Async.delay = function(callback, timeout, args) {
    setTimeout(callback.apply.bind(callback, this, args || []), timeout);
  };


  /**
   * Find the prefered method for queue callbacks in the event loop
   */

  if (typeof(process) === "object" && typeof(process.nextTick) === "function") {
    nextTick = process.nextTick;
  }
  else if (typeof(setImmediate) === "function") {
    nextTick = setImmediate;
  }
  else {
    nextTick = setTimeout;
  }

  Async.nextTick = nextTick;
  module.exports = Async;
});
