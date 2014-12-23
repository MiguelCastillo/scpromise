spromise [![Build Status](https://travis-ci.org/MiguelCastillo/spromise.png?branch=master)](https://travis-ci.org/MiguelCastillo/spromise)
=========

spromise (Small Promise), is an implementation of the promise <a href="https://promisesaplus.com/">A+ spec</a>.  It is designed to be lightweight, performant, and per spec, interoperable with other promise implementations such as jQuery's <a href="http://api.jquery.com/category/deferred-object/">deferred</a>.

API documentation can be found on the wiki API [page](https://github.com/MiguelCastillo/spromise/wiki/API).

## Table of Contents

* [Install](#install)
* [Downloads](#downloads)
* [Build](#build)
* [Tests](#tests)
    * [Unit tests](#unit-tests)
    * [Compliance unit tests:](#compliance-unit-tests)
* [Compliance notes](#compliance-notes)


## Install using...

* **bower**
```
$ bower install spromise
```

* **npm**
```
$ npm install spromise
```

## Downloads

General purpose UMD (Browser, Node):

 * [spromise.js](https://github.com/MiguelCastillo/spromise/releases/download/v0.9.0/spromise.js) - minified
 * [spromise-debug.js](https://github.com/MiguelCastillo/spromise/releases/download/v0.9.0/spromise-debug.js)

For inline inclusion in your AMD code:

 * [spromise-lib.js](https://github.com/MiguelCastillo/spromise/releases/download/v0.9.0/spromise-lib.js) - minified
 * [spromise-lib-debug.js](https://github.com/MiguelCastillo/spromise/releases/download/v0.9.0/spromise-lib-debug.js)

## Build

Run the following command in the terminal:

```
$ npm install
$ grunt
```

## Tests

#### Unit tests

Run the following commands in the terminal:

```
$ npm install
$ grunt test
```

#### Compliance unit tests:

Run the following commands in the terminal:
```
$ npm install
$ npm test
```

## Compliance notes

With the exception of 2.2.5, which states that onFullfilled/onRejected must not be called with "this", all tests for compliance pass.

The reason spromise was left non compliant for this particular item is to faithfully handle "context" configured in jQuery ajax requests.

* NOTE: The spec makes use of `fulfilled`, which is the exact same thing as `resolved` in spromise. The different names exists because it seems more consistent that if you call `resolve` to transition a promise to the `resolved` state, that the state is `resolved` and not `fulfilled`.  In spromise's documention both are used simply for better readability.

##### Test results:

```
  868 passing (14s)
  4 failing

  1) 2.2.5 `onFulfilled` and `onRejected` must be called as functions (i.e. with no `this` value). strict mode fulfilled:
     Error: timeout of 200ms exceeded
      at null.<anonymous> (/home/travis/build/MiguelCastillo/spromise/node_modules/promises-aplus-tests/node_modules/mocha/lib/runnable.js:158:19)
      at Timer.listOnTimeout [as ontimeout] (timers.js:112:15)

  2) 2.2.5 `onFulfilled` and `onRejected` must be called as functions (i.e. with no `this` value). strict mode rejected:
     Error: timeout of 200ms exceeded
      at null.<anonymous> (/home/travis/build/MiguelCastillo/spromise/node_modules/promises-aplus-tests/node_modules/mocha/lib/runnable.js:158:19)
      at Timer.listOnTimeout [as ontimeout] (timers.js:112:15)

  3) 2.2.5 `onFulfilled` and `onRejected` must be called as functions (i.e. with no `this` value). sloppy mode fulfilled:
     Error: timeout of 200ms exceeded
      at null.<anonymous> (/home/travis/build/MiguelCastillo/spromise/node_modules/promises-aplus-tests/node_modules/mocha/lib/runnable.js:158:19)
      at Timer.listOnTimeout [as ontimeout] (timers.js:112:15)

  4) 2.2.5 `onFulfilled` and `onRejected` must be called as functions (i.e. with no `this` value). sloppy mode rejected:
     Error: timeout of 200ms exceeded
      at null.<anonymous> (/home/travis/build/MiguelCastillo/spromise/node_modules/promises-aplus-tests/node_modules/mocha/lib/runnable.js:158:19)
      at Timer.listOnTimeout [as ontimeout] (timers.js:112:15)
```
