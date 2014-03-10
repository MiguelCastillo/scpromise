/**
 * spromise Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 *
 * https://github.com/MiguelCastillo/spromise
 */

/**
 * almond 0.2.6 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

/**
 * spromise Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 */

(function(e,t){typeof require=="function"&&typeof exports=="object"&&typeof module=="object"?module.exports=t():typeof define=="function"&&define.amd?define(t):e.spromise=t()})(this,function(){var e,t,n;return function(r){function d(e,t){return h.call(e,t)}function v(e,t){var n,r,i,s,o,u,a,f,c,h,p=t&&t.split("/"),d=l.map,v=d&&d["*"]||{};if(e&&e.charAt(0)===".")if(t){p=p.slice(0,p.length-1),e=p.concat(e.split("/"));for(f=0;f<e.length;f+=1){h=e[f];if(h===".")e.splice(f,1),f-=1;else if(h===".."){if(f===1&&(e[2]===".."||e[0]===".."))break;f>0&&(e.splice(f-1,2),f-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((p||v)&&d){n=e.split("/");for(f=n.length;f>0;f-=1){r=n.slice(0,f).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,o=f;break}}}if(s)break;!u&&v&&v[r]&&(u=v[r],a=f)}!s&&u&&(s=u,o=a),s&&(n.splice(0,o,s),e=n.join("/"))}return e}function m(e,t){return function(){return s.apply(r,p.call(arguments,0).concat([e,t]))}}function g(e){return function(t){return v(t,e)}}function y(e){return function(t){a[e]=t}}function b(e){if(d(f,e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!d(a,e)&&!d(c,e))throw new Error("No "+e);return a[e]}function w(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function E(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=Object.prototype.hasOwnProperty,p=[].slice;o=function(e,t){var n,r=w(e),i=r[0];return e=r[1],i&&(i=v(i,t),n=b(i)),i?n&&n.normalize?e=n.normalize(e,g(t)):e=v(e,t):(e=v(e,t),r=w(e),i=r[0],e=r[1],i&&(n=b(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return m(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:E(e)}}},i=function(e,t,n,i){var s,l,h,p,v,g=[],w;i=i||e;if(typeof n=="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(v=0;v<t.length;v+=1){p=o(t[v],i),l=p.f;if(l==="require")g[v]=u.require(e);else if(l==="exports")g[v]=u.exports(e),w=!0;else if(l==="module")s=g[v]=u.module(e);else if(d(a,l)||d(f,l)||d(c,l))g[v]=b(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,m(i,!0),y(l),{}),g[v]=a[l]}}h=n.apply(a[e],g);if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!w)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){return typeof e=="string"?u[e]?u[e](t):b(o(e,t).f):(e.splice||(l=e,t.splice?(e=t,t=n,n=null):e=r),t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},4),s)},s.config=function(e){return l=e,l.deps&&s(l.deps,l.callback),s},e._defined=a,n=function(e,t,n){t.splice||(n=t,t=[]),!d(a,e)&&!d(f,e)&&(f[e]=[e,t,n])},n.amd={jQuery:!0}}(),n("lib/js/almond",function(){}),n("src/async",[],function(){function n(){function u(t){return function(){t.apply(s,e)}}var e=arguments,n=arguments[0],r=1,i=!0,s=this,o={};return typeof n=="boolean"&&(i=n,n=arguments[1],r=2),e=arguments[r]||[],o.run=function(r){t(u(r||n))},i?o.run():o}var e=this,t;return e.setImmediate?t=e.setImmediate:e.process&&typeof e.process.nextTick=="function"?t=e.process.nextTick:t=function(e){setTimeout(e,0)},n}),n("src/promise",["src/async"],function(e){function i(e,r){function u(e,t){return o.then(e,t)}function a(n){return o.queue(t.resolved,n),e.promise}function f(n){return o.queue(t.rejected,n),e.promise}function l(t){return o.queue(n.always,t),e.promise}function c(){return o._state}function h(){return o.transition(t.resolved,this,arguments),e}function p(){return o.transition(t.rejected,this,arguments),e}function d(t){return t.then(e.resolve,e.reject),e}e=e||{};var o=new s(e,r||{});return u.constructor=i,u.stateManager=o,e.always=l,e.done=a,e.fail=f,e.thenable=d,e.resolve=h,e.reject=p,e.then=u,e.state=c,e.promise={always:l,done:a,fail:f,then:u,state:c},e}function s(e,t){this.promise=e,t.async?(this.state=t.state,this.async=t.async):t.state&&this.transition(t.state,t.context,t.value)}function o(e){this.promise=e,this.resolved=0}var t={pending:0,resolved:2,rejected:3},n={always:1,resolved:2,rejected:3},r={resolve:"resolve",reject:"reject"};return i.factory=function(e){if(typeof e!="function")throw new TypeError("Resolver must be a function");var t=new i;return e(t.resolve,t.reject),t.promise},i.defer=function(e,t){return new i(e,t)},i.thenable=function(e){var t=new i;return t.thenable(e)},i.rejected=function(){return new i({},{context:this,value:arguments,state:t.rejected})},i.resolved=function(){return new i({},{context:this,value:arguments,state:t.resolved})},s.prototype.queue=function(e,t){this.state?(this.state===e||e===1)&&this.async.run(t):(this.deferred||(this.deferred=[])).push({type:e,cb:t})},s.prototype.notify=function(){var e=this.deferred,t=this.state,r=0,i=e.length,s;do s=e[r++],(s.type===t||s.type===n.always)&&this.async.run(s.cb);while(r<i);this.deferred=null},s.prototype.transition=function(t,n,r){this.state||(this.state=t,this.context=n,this.value=r,this.async=e.call(n,!1,void 0,r),this.deferred&&this.notify())},s.prototype.then=function(e,n){var s,u;return e=typeof e=="function"?e:null,n=typeof n=="function"?n:null,!e&&this.state===t.resolved||!n&&this.state===t.rejected?u=new i({},this):(u=new i,s=new o(u),this.queue(t.resolved,s.chain(r.resolve,e||n)),this.queue(t.rejected,s.chain(r.reject,n||e))),u},o.prototype.chain=function(e,t,n){var r=this;return function(){if(!r.resolved){r.resolved++,r.context=this,r.then=n;try{r.resolve(e,t?[t.apply(this,arguments)]:arguments)}catch(s){r.promise.reject.call(r.context,s)}}}},o.prototype.resolve=function(e,t){var n=t[0],s=n&&n.then,u=s&&typeof s=="function",a,f;if(n===this.promise)throw new TypeError;if(u&&s.constructor===i)a=new o(this.promise),n.done(a.chain(r.resolve)).fail(a.chain(r.reject));else{f=u&&this.then!==n&&typeof n;if(f==="function"||f==="object")try{a=new o(this.promise,n),s.call(n,a.chain(r.resolve,!1,n),a.chain(r.reject,!1,n))}catch(l){a.resolved||this.promise.reject.call(this.context,l)}else this.promise[e].apply(this.context,t)}},i.states=t,i}),n("src/when",["src/promise","src/async"],function(e,t){function n(){function f(){u&&u--,u||r.resolve.apply(i,n)}function l(e){return function(){n[e]=arguments.length===1?arguments[0]:arguments,f()}}function c(){r.reject.apply(this,arguments)}function h(){a=u=n.length;for(s=0;s<a;s++)o=n[s],o&&typeof o.then=="function"?o.then(l(s),c):(n[s]=o,f())}var n=Array.prototype.slice.call(arguments),r=e.defer(),i=this,s,o,u,a;return n.length?(t(h),r):r.resolve(null)}return n}),n("src/spromise",["src/promise","src/async","src/when"],function(e,t,n){return e.when=n,e.async=t,e}),t("src/spromise")});