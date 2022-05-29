/**
 * 参与者模式：在特定的作用域中执行给定的函数，并将参数原封不动地传递
 */

// 函数绑定bind(重点)
function bind(fn, context) {
  var Slice = Array.prototype.slice,
      args = Slice.call(arguments, 2)
  return function() {
    var addArgs = Slice.call(arguments),
        allArgs = addArgs.concat(args)
    return fn.apply(context, allArgs);
  }
}

// 函数柯里化
function curry(fn) {
  var Slice = [].slice
  var args = Slice.call(arguments, 1)
  return function() {
    var addArgs = Slice.call(arguments),
        addArgs = args.concat(addArgs)
    return fn.apply(null, allArgs)
  }
}

// 测试
function add(num1, num2) {
  return num1 + num2
}
var add5 = curry(add, 5, 8)