/**
 * spromise Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 *
 * https://github.com/MiguelCastillo/spromise
 */


(function (root, factory) {
  if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    // CommonJS support
    module.exports = factory();
  }
  else if (typeof define === 'function' && define.amd) {
    // Do AMD support
    define(factory);
  } else {
    // Non AMD loading
    root.spromise = factory();
  }
}(this, function () {


/**
 * almond 0.2.6 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);

                name = baseParts.concat(name.split("/"));

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (typeof callback === 'function') {

            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback.apply(defined[name], args);

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        config = cfg;
        if (config.deps) {
            req(config.deps, config.callback);
        }
        return req;
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("libs/js/almond", function(){});

/**
 * spromise Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 */


define( 'src/async',[],function() {

  /**
  * Handle exceptions in a setTimeout.
  * @func <function> to be called when timeout finds cycles to execute it
  * @err  <function> to be called when there is an exception thrown.  If
  *  no function is provided then the exception will be rethrown outside
  *  of the setTimeout scope
  */
  function async( ) {
    var args     = Array.prototype.slice.call(arguments),
        func     = args.shift(),
        context  = this,
        error    = function(){};


    function runner() {
      return function() {
        try {
          func.apply(context, args[0]);
        }
        catch( ex ) {
          setTimeout(thrown(ex), 1);
        }
      };
    }

    function thrown(err) {
      return function() {
        error(err);
      };
    }

    function fail(cb) {
      error = cb;
    }

    // Schedule for running...
    setTimeout(runner(), 1);

    return {
      fail: fail
    };
  }


  return async;

});

/**
 * spromise Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 */


define('src/promise',["src/async"], function(async) {
  

  var states = {
    "pending": 0,
    "resolved": 1,
    "rejected": 2
  };

  var actions = {
    resolve: "resolve",
    reject: "reject"
  };

  var queues = {
    always: "always",
    resolved: "resolved",
    rejected: "rejected"
  };

  function isResolved( state ) {
    return state === states.resolved;
  }

  function isRejected( state ) {
    return state === states.rejected;
  }

  function isPending( state ) {
    return state === states.pending;
  }


  /**
  * Simple Compliant Promise
  */
  function promise( promise1 ) {
    promise1 = promise1 || {}; // Make sure we have a promise1promise1 object
    var _state   = states.pending, // Initial state
        _context = this,
        _queues  = {
          always: [],             // Always list of callbacks
          resolved: [],           // Success list of callbacks
          rejected: []            // Failue list of callbacks
        }, _value;                // Resolved/Rejected value.


    /**
    * Then promise interface
    */
    function then( onResolved, onRejected ) {
      // Create a new promise to properly create a promise chain
      var promise2 = promise();
      promise1.done(_thenHandler(promise2, actions.resolve, onResolved));
      promise1.fail(_thenHandler(promise2, actions.reject, onRejected));
      return promise2;
    }

    function done( cb ) {
      if ( !isRejected(_state) ) {
        _queue( queues.resolved, cb );
      }

      return promise1;
    }

    function fail( cb ) {
      if ( !isResolved(_state) ) {
        _queue( queues.rejected, cb );
      }

      return promise1;
    }

    function resolve( ) {
      if ( isPending(_state) ) {
        _context = this;
        _updateState( states.resolved, arguments );
      }

      return promise1;
    }

    function reject( ) {
      if ( isPending(_state) ) {
        _context = this;
        _updateState( states.rejected, arguments );
      }

      return promise1;
    }

    function always( cb ) {
      _queue( queues.always, cb );
      return promise1;
    }

    function state() {
      return _state;
    }


    /**
    * Promise API
    */
    promise1.always = always;
    promise1.done = done;
    promise1.fail = fail;
    promise1.resolve = resolve;
    promise1.reject = reject;
    promise1.then = then;
    promise1.state = state;
    return promise1;


    /**
    * Internal core functionality
    */


    // Queue will figure out if the promise is resolved/rejected and do something
    // with the callback based on that.  It also verifies that there is a callback
    // function
    function _queue ( type, cb ) {
      // If the promise is already resolved/rejected, we call the callback right away
      if ( isPending(_state) ) {
        _queues[type].push(cb);
      }
      else {
        async.apply(_context, [cb, _value]).fail(promise1.reject);
        //cb.apply(_context, _value);
      }
    }

    // Tell everyone we are resolved/rejected
    function _notify ( queue ) {
      var i, length;
      for ( i = 0, length = queue.length; i < length; i++ ) {
        queue[i].apply(_context, _value);
      }

      // Empty out the array
      queue.splice(0, queue.length);
    }

    // Sets the state of the promise and call the callbacks as appropriate
    function _updateState ( state, value ) {
      _state = state;
      _value = value;
      async(function() {
        _notify( _queues[_state === states.resolved ? queues.resolved : queues.rejected] );
        _notify( _queues[queues.always] );
      }).fail(promise1.reject);
    }

    // Promise.then handler DRYs onresolved and onrejected
    function _thenHandler ( promise2, action, handler ) {
      return function thenHadler( ) {
        try {
          var data;

          if ( handler ) {
            data = handler.apply(this, arguments);
          }

          // Setting the data to arguments when data is undefined isn't compliant.  But I have
          // found that this behavior is much more desired when chaining promises.
          data = (data !== undefined && [data]) || arguments;
          _resolver.call( this, promise2, data, action );
        }
        catch( ex ) {
          promise2.reject(ex);
        }
      };
    }

    // Routine to resolve a thenable.  Data is in the form of an arguments object (array)
    function _resolver ( promise2, data, action ) {
      var input = data[0], then = (input && input.then), inputType = typeof input;

      // The resolver input must not be the promise tiself
      if ( input === promise2 ) {
        throw new TypeError();
      }
      // Is data a thenable?
      else if ((input !== null && (inputType === "function" || inputType === "object")) && typeof then === "function") {
        then.call(input, _thenHandler( promise2, actions.resolve ), _thenHandler( promise2, actions.reject ));
      }
      // Resolve/Reject promise
      else {
        promise2[action].apply( this, data );
      }
    }
  }

  // Expose enums for the states
  promise.states = states;
  return promise;
});

/**
 * spromise Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 */


define('src/when',[
  "src/promise",
  "src/async"
], function(promise, async) {
  

  /**
  * Interface to allow multiple promises to be synchronized
  */
  function when( ) {
    // The input is the queue of items that need to be resolved.
    var queue    = Array.prototype.slice.call(arguments),
        promise1 = promise(),
        context  = this,
        i, item, remaining, queueLength;

    if ( !queue.length ) {
      return promise1.resolve(null);
    }

    //
    // Check everytime a new resolved promise occurs if we are done processing all
    // the dependent promises.  If they are all done, then resolve the when promise
    //
    function checkPending() {
      if ( remaining ) {
        remaining--;
      }

      if ( !remaining ) {
        promise1.resolve.apply(context, queueLength === 1 ? queue[0] : queue);
      }
    }

    // Wrap the resolution to keep track of the proper index in the closure
    function resolve( index ) {
      return function() {
        // We will replace the item in the queue with result to make
        // it easy to send all the data into the resolve interface.
        queue[index] = arguments;
        checkPending();
      };
    }

    function reject() {
      promise1.reject.apply(this, arguments);
    }

    function processQueue() {
      try {
        queueLength = remaining = queue.length;
        for ( i = 0; i < queueLength; i++ ) {
          item = queue[i];

          if ( item && typeof item.then === "function" ) {
            item.then(resolve(i), reject);
          }
          else {
            queue[i] = item;
            checkPending();
          }
        }
      }
      catch( ex ) {
        reject(ex);
      }
    }

    // Process the promises and callbacks
    async(processQueue);
    return promise1;
  }

  return when;
});


/**
 * spromise Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 */


define('src/spromise',[
  "src/promise",
  "src/async",
  "src/when"
], function(promise, async, when) {
  promise.when = when;
  promise.async  = async;
  return promise;
});

  return require("src/spromise");
}));