var promisesAplusTests = require("promises-aplus-tests"),
    spromise = require("../dist/spromise");

spromise.debug = false;

// Adapter so that promise tests can run
function adapter() {
  var promise1 = spromise.defer();
  return {
    promise: promise1.promise,
    resolve: promise1.resolve,
    reject: promise1.reject
  };
}

promisesAplusTests({deferred:adapter}, function (err) {
  console.log("=====> Errors:");
  console.log(err);
});
