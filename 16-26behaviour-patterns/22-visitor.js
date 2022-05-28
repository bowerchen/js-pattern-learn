/**
 * 访问者模式： 针对于对象结构中的元素，定义在不改变该对象的前提下访问结构中元素的新方法
 */

var Visitor = (function () {
  return {
    // 截取方法
    splice: function () {
      var args = Array.prototype.splice.call(arguments, 1);
      return Array.prototype.splice.apply(arguments[0], args);
    },
    // 追加数据
    push: function () {
      var len = arugments[0].length || 0;
      var args = this.splice(arguments, 1);
      arguments[0].length = len + arugments.length - 1;
      return Array.prototype.push.apply(arguments[0], args);
    },
    // 弹出数据
    pop: function () {
      return Array.prototype.pop.apply(arguments[0]);
    },
  };
})();

var a = new Object();
console.log(a.length);
Visitor.push(a, 1, 2, 3);
console.log(a.length);
Visitor.push(a, 4, 5, 6);
console.log(a)
console.log(a.length)
Visitor.pop(a)
console.log(a)
console.log(a.length)
Visitor.splice(a, 5)
console.log(a)

