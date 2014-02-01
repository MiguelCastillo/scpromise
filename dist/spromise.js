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

(function(e,t){typeof require=="function"&&typeof exports=="object"&&typeof module=="object"?module.exports=t():typeof define=="function"&&define.amd?define(t):e.spromise=t()})(this,function(){var e,t,n;return function(r){function d(e,t){return h.call(e,t)}function v(e,t){var n,r,i,s,o,u,a,f,c,h,p=t&&t.split("/"),d=l.map,v=d&&d["*"]||{};if(e&&e.charAt(0)===".")if(t){p=p.slice(0,p.length-1),e=p.concat(e.split("/"));for(f=0;f<e.length;f+=1){h=e[f];if(h===".")e.splice(f,1),f-=1;else if(h===".."){if(f===1&&(e[2]===".."||e[0]===".."))break;f>0&&(e.splice(f-1,2),f-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((p||v)&&d){n=e.split("/");for(f=n.length;f>0;f-=1){r=n.slice(0,f).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,o=f;break}}}if(s)break;!u&&v&&v[r]&&(u=v[r],a=f)}!s&&u&&(s=u,o=a),s&&(n.splice(0,o,s),e=n.join("/"))}return e}function m(e,t){return function(){return s.apply(r,p.call(arguments,0).concat([e,t]))}}function g(e){return function(t){return v(t,e)}}function y(e){return function(t){a[e]=t}}function b(e){if(d(f,e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!d(a,e)&&!d(c,e))throw new Error("No "+e);return a[e]}function w(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function E(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=Object.prototype.hasOwnProperty,p=[].slice;o=function(e,t){var n,r=w(e),i=r[0];return e=r[1],i&&(i=v(i,t),n=b(i)),i?n&&n.normalize?e=n.normalize(e,g(t)):e=v(e,t):(e=v(e,t),r=w(e),i=r[0],e=r[1],i&&(n=b(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return m(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:E(e)}}},i=function(e,t,n,i){var s,l,h,p,v,g=[],w;i=i||e;if(typeof n=="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(v=0;v<t.length;v+=1){p=o(t[v],i),l=p.f;if(l==="require")g[v]=u.require(e);else if(l==="exports")g[v]=u.exports(e),w=!0;else if(l==="module")s=g[v]=u.module(e);else if(d(a,l)||d(f,l)||d(c,l))g[v]=b(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,m(i,!0),y(l),{}),g[v]=a[l]}}h=n.apply(a[e],g);if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!w)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){return typeof e=="string"?u[e]?u[e](t):b(o(e,t).f):(e.splice||(l=e,t.splice?(e=t,t=n,n=null):e=r),t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},4),s)},s.config=function(e){return l=e,l.deps&&s(l.deps,l.callback),s},e._defined=a,n=function(e,t,n){t.splice||(n=t,t=[]),!d(a,e)&&!d(f,e)&&(f[e]=[e,t,n])},n.amd={jQuery:!0}}(),n("libs/js/almond",function(){}),n("src/async",[],function(){function e(){function i(){return function(){try{t.apply(n,e[0])}catch(r){setTimeout(s(r),1)}}}function s(e){return function(){r(e)}}function o(e){r=e}var e=Array.prototype.slice.call(arguments),t=e.shift(),n=this,r=function(){};return setTimeout(i(),1),{fail:o}}return e}),n("src/promise",["src/async"],function(e){function i(e){return e===t.resolved}function s(e){return e===t.rejected}function o(e){return e===t.pending}function u(a){function p(e,t){var r=u();return a.done(x(r,n.resolve,e)),a.fail(x(r,n.reject,t)),r}function d(e){return s(f)||w(r.resolved,e),a}function v(e){return i(f)||w(r.rejected,e),a}function m(){return o(f)&&(l=this,S(t.resolved,arguments)),a}function g(){return o(f)&&(l=this,S(t.rejected,arguments)),a}function y(e){return w(r.always,e),a}function b(){return f}function w(t,n){o(f)?c[t].push(n):e.apply(l,[n,h]).fail(a.reject)}function E(e){var t,n;for(t=0,n=e.length;t<n;t++)e[t].apply(l,h);e.splice(0,e.length)}function S(n,i){f=n,h=i,e(function(){E(c[f===t.resolved?r.resolved:r.rejected]),E(c[r.always])}).fail(a.reject)}function x(e,t,n){return function(){try{var i;n&&(i=n.apply(this,arguments)),i=i!==undefined&&[i]||arguments,T.call(this,e,i,t)}catch(s){e.reject(s)}}}function T(e,t,r){var i=t[0],s=i&&i.then,o=typeof i;if(i===e)throw new TypeError;i===null||o!=="function"&&o!=="object"||typeof s!="function"?e[r].apply(this,t):s.call(i,x(e,n.resolve),x(e,n.reject))}a=a||{};var f=t.pending,l=this,c={always:[],resolved:[],rejected:[]},h;return a.always=y,a.done=d,a.fail=v,a.resolve=m,a.reject=g,a.then=p,a.state=b,a}var t={pending:0,resolved:1,rejected:2},n={resolve:"resolve",reject:"reject"},r={always:"always",resolved:"resolved",rejected:"rejected"};return u.states=t,u}),n("src/when",["src/promise","src/async"],function(e,t){function n(){function f(){u&&u--,u||r.resolve.apply(i,a===1?n[0]:n)}function l(e){return function(){n[e]=arguments,f()}}function c(){r.reject.apply(this,arguments)}function h(){try{a=u=n.length;for(s=0;s<a;s++)o=n[s],o&&typeof o.then=="function"?o.then(l(s),c):(n[s]=o,f())}catch(e){c(e)}}var n=Array.prototype.slice.call(arguments),r=e(),i=this,s,o,u,a;return n.length?(t(h),r):r.resolve(null)}return n}),n("src/spromise",["src/promise","src/async","src/when"],function(e,t,n){return e.when=n,e.async=t,e}),t("src/spromise")});