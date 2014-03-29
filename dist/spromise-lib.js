/**
 * spromise Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 *
 * https://github.com/MiguelCastillo/spromise
 */

/**
 * spromise Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 */

define("src/async",[],function(){var e=this,t;return e.setImmediate?t=e.setImmediate:e.process&&typeof e.process.nextTick=="function"?t=e.process.nextTick:t=function(t){e.setTimeout(t,0)},t}),define("src/promise",["src/async"],function(e){function n(e,i){function u(e,t){return o.then(e,t)}function a(e){return o.enqueue(t.resolved,e),s.promise}function f(e){return o.enqueue(t.rejected,e),s.promise}function l(e){return o.enqueue(t.always,e),s.promise}function c(e){return o.enqueue(t.notify,e),s.promise}function h(){return o.state}function p(){return o.transition(t.resolved,this,arguments),s}function d(){return o.transition(t.rejected,this,arguments),s}if(this instanceof n==0)return new n(e,i);var s=this,o=new r(s,i||{});u.constructor=n,u.stateManager=o,s.always=l,s.done=a,s.fail=f,s.notify=c,s.resolve=p,s.reject=d,s.then=u,s.state=h,s.promise={always:l,done:a,fail:f,notify:c,then:u,state:h},typeof e=="function"&&e.call(s,s.resolve,s.reject)}function r(e,n){this.state=t.pending,n.state&&this.transition(n.state,n.context,n.value)}function i(e){this.promise=e}var t={pending:0,always:1,resolved:2,rejected:3,notify:4};return n.defer=function(){return new n},n.thenable=function(e){return new n(e.then)},n.rejected=function(){return new n(null,{context:this,value:arguments,state:t.rejected})},n.resolved=function(){return new n(null,{context:this,value:arguments,state:t.resolved})},r.prototype.enqueue=function(n,r,i){var s=this,o=s.state;o?o===n||t.always===n?i?r.apply(s.context,s.value):e(function(){r.apply(s.context,s.value)}):t.notify===n&&(i?r.call(s.context,s.state,s.value):e(function(){r.call(s.context,s.state,s.value)})):(this.queue||(this.queue=[])).push({state:n,cb:r})},r.prototype.transition=function(e,t,n,r){if(this.state)return;this.state=e,this.context=t,this.value=n;if(this.queue){var i=this.queue,s=i.length,o=0,u;this.queue=null;for(;o<s;o++)u=i[o],this.enqueue(u.state,u.cb,r)}},r.prototype.then=function(e,r){var s;return e=typeof e=="function"?e:null,r=typeof r=="function"?r:null,!e&&this.state===t.resolved||!r&&this.state===t.rejected?new n(null,this):(s=new i(new n),this.enqueue(t.notify,s.notify(e,r)),s.promise)},i.prototype.notify=function(e,n){var r=this;return function(s,o){var u=(e||n)&&(s===t.resolved?e||n:n||e);try{r.context=this,r.finalize(s,u?[u.apply(this,o)]:o)}catch(a){r.promise.reject.call(r.context,a)}}},i.prototype.chain=function(e){var t=this;return function(){try{t.resolved||(t.resolved=!0,t.context=this,t.finalize(e,arguments))}catch(r){t.promise.reject.call(t.context,r)}}},i.prototype.finalize=function(e,r){var s=r[0],o=s&&s.then,u=this.promise,a=this.context,f,l;if(s===this.promise)throw new TypeError("Resolution input must not be the promise being resolved");if(o&&o.constructor===n)return o.stateManager.enqueue(t.notify,this.notify(),!0);l=o&&typeof o=="function"&&typeof s;if(l==="function"||l==="object")try{f=new i(u),o.call(s,f.chain(t.resolved),f.chain(t.rejected))}catch(c){f.resolved||u.reject.call(a,c)}else u.then.stateManager.transition(e,a,r)},n.states=t,n}),define("src/when",["src/promise","src/async"],function(e,t){function n(e,t,n){return typeof e=="function"?e.apply(n,t||[]):e}function r(){function l(){a&&a--,a||i.resolve.apply(s,r)}function c(e){return function(){r[e]=arguments.length===1?arguments[0]:arguments,l()}}function h(){i.reject.apply(this,arguments)}function p(){f=a=r.length;for(o=0;o<f;o++)u=r[o],u&&typeof u.then=="function"?u.then(c(o),h):(r[o]=n(u),l())}var r=Array.prototype.slice.call(arguments),i=e.defer(),s=this,o,u,a,f;return r.length?(t(p),i):i.resolve(null)}return r}),define("src/spromise",["src/promise","src/async","src/when"],function(e,t,n){return e.when=n,e.async=t,e});