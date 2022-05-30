/**
 * 惰性模式：减少每次代码执行时的重复性的分支判断，通过对对象重定义来屏蔽原对象中的分支判断
 */

var A = {};

// 加载即执行
A.on = (function (dom, type, fn) {
  if (document.addEventListener) {
    return function (dom, type, fn) {
      dom.addEventListener(type, fn, false);
    };
  } else if (document.attachEvent) {
    return function (dom, type, fn) {
      dom.attachEvent("on" + type, fn);
    };
  } else {
    return function (dom, type, fn) {
      dom["on" + type] = fn;
    };
  }
})();

// 惰性执行
A.on = function (dom, type, fn) {
  if (dom.addEventListener) {
    A.on = function (dom, type, fn) {
      dom.addEventListener(type, fn, false);
    };
  } else if (dom.attachEvent) {
    A.on = function (dom, type, fn) {
      dom.attachEvent("on" + type, fn);
    };
  } else {
    A.on = function (dom, type, fn) {
      dom["on" + type] = fn;
    };
  }
  // 执行重定义方法
  A.on(dom, type, fn)
};



