spromise [![Build Status](https://travis-ci.org/MiguelCastillo/spromise.png?branch=master)](https://travis-ci.org/MiguelCastillo/spromise)
=========

Small Promise, is a lightweight promise library that's 99% <i>compliant</i> with the promise a+ spec.


API
========

1. <code>then</code> - interface that takes in as a first parameter an <code>onResolved</code> callback and as a second parameter an <code>onRejected</code> callback.  Great for chaining promises and controlling the flow of execution in a chain of promises.
2. <code>done</code> - takes an <code>onResolved</code> callback that gets called when the promise is successfully resolved. If the promise is resolved with data, that will then be passed in as parameters to <code>onResolved</code>.
3. <code>fail</code> - takes an <code>onRejected</code> callback that gets called when the promise is rejected. If the promise is rejected with a reason(s), that will then be passed in as parameters to <code>onRejected</code>.
4. <code>always</code> - takes a callback that is always called, either when the promise is rejected or resolved.
5. <code>resolve</code> - interface to resolve the promise. This will cause all currently registered <code>onResolved</code> callbacks and any future ones to be called.  Any data passed into the <code>resolve</code> interface will then be passed into each callback as parameters.
6. <code>reject</code> - interface to reject the promise. As <code>resolve</code>, this will cause all currently registered <code>onRejected</code> callbacks and any future ones to be called.  Any reason(s) passed into the <code>reject</code> interface will then be passed into each callback as paramters.
7. <code>state</code> - interface to get the current state of the promise.  It can either be pending, resolved, or rejected.  Please use <code>spromise.states</code> for a more meaningful translation of the value returned.  E.g. <code>if (promise1.state() === spromise.states.pending) {}</code>.
8. <code>when</code> - creates and returns a promise. <code>when</code> also takes in N arguments that control when the <code>when</code> promise is resolved.  Passing in promises as arguments will cause <code>when</code> to wait for all the input promises to resolve.  If one fails, everything fails.  None promise objects can also be passed in, in which case they are immediately available as resolved.  <code>when</code> is very useful when synchronizing a group of asynchronous and synchronous operations.

Examples
========
For a set of use cases, please see <a href="https://github.com/MiguelCastillo/spromise/tree/master/tests/specs">tests</a>

<p>Simplest node sample:</p>
``` javascript
var spromise = require("spromise");
var promise = spromise();

promise.done(function(data) {
  console.log(data);
});

promise.resolve("Yes, it works");
```

Compliance
========

With the exception of 2.2.5, which states that onFullfilled/onRejected must not be called with "this", all tests for compliance pass.<br>
The reason spromise was left non compliant for this particular item is to faithfully handle "context" configured in jQuery ajax requests.

<pre>
  868 passing (14s)
  4 failing

  1) 2.2.5 `onFulfilled` and `onRejected` must be called as functions (i.e. with no `this` value). strict mode fulfilled:
     Error: timeout of 200ms exceeded
      at null.<anonymous> (/Users/mcastillo/Projects/promises-tests/node_modules/mocha/lib/runnable.js:165:14)
      at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)

  2) 2.2.5 `onFulfilled` and `onRejected` must be called as functions (i.e. with no `this` value). strict mode rejected:
     Error: timeout of 200ms exceeded
      at null.<anonymous> (/Users/mcastillo/Projects/promises-tests/node_modules/mocha/lib/runnable.js:165:14)
      at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)

  3) 2.2.5 `onFulfilled` and `onRejected` must be called as functions (i.e. with no `this` value). sloppy mode fulfilled:
     Error: timeout of 200ms exceeded
      at null.<anonymous> (/Users/mcastillo/Projects/promises-tests/node_modules/mocha/lib/runnable.js:165:14)
      at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)

  4) 2.2.5 `onFulfilled` and `onRejected` must be called as functions (i.e. with no `this` value). sloppy mode rejected:
     Error: timeout of 200ms exceeded
      at null.<anonymous> (/Users/mcastillo/Projects/promises-tests/node_modules/mocha/lib/runnable.js:165:14)
      at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)
</pre>