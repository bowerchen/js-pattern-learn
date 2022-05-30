/**
 * 等待者模式： 通过对多个异步进程监听，来触发未来发生的动作
 */

var Waiter = function () {
  var dfd = [],
    doneArr = [],
    failArr = [],
    slice = Array.prototype.slice,
    that = this;

  var Primise = function () {
    this.resolved = false;
    this.rejected = false;
  };
  Primise.prototype = {
    resolved: function () {
      this.resolved = true;
      if (!dfd.length) {
        return;
      }
      for (var i = dfd.length - 1; i >= 0; i--) {
        if ((dfd[i] && !dfd[i].resolved) || dfd[i].rejected) {
          return;
        }
        dfd.splice(i, 1);
      }
      _exec(doneArr);
    },
    rejected: function () {
      this.rejected = true;
      if (!dfd.length) {
        return;
      }
      dfd.splice(0);
      _exec(failArr);
    },
  };
  that.Deferred = function () {
    return new Primise();
  };
  function _exec(arr) {
    var i = 0,
      len = arr.length;
    for (; i < len; i++) {
      try {
        arr[i] && arr[i]();
      } catch (e) {}
    }
  }
  that.when = function () {
    dfd = slice.call(arguments)
    var i = dfd.length
    for (--i; i>=0;i--) {
      if (!dfd[i] || dfd[i].resolved || dfd[i].rejected || !dfd[i] instanceof Primise) {
        dfd.splice(i, 1)
      }
    }
    return that
  };
  that.done = function () {
    doneArr = doneArr.concat(slice.call(arguments))
    return that
  };
  that.fail = function () {
    failArr = failArr.concat(slice.call(arguments))
    return that
  };
};
