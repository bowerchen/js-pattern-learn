/**
 * 链模式：通过在对象方法中将当前对象返回，实现对同一个对象多个方法的链式调用。从而简化对该对象的多个方法的多次调用时，对该对象的多次引用。
 */

var A = function (selector, context) {
  return new A.fn.init(selector, context);
};

A.fn = A.prototype = {
  constructor: A,
  init: function (selector, context) {
    this.length = 0;
    context = context || document;
    if (selector.indexof("#")) {
      this[0] = document.getElementById(selector.slice(1));
      this.length = 1;
    } else {
      var doms = context.getElementsByTagName(selector),
        i = 0,
        len = doms.length;
      for (; i < len; i++) {
        this[i] = doms[i];
      }
      this.length = len;
    }
    this.context = context;
    this.selector = selector;
    return this;
  },
  push: [].push,
  sort: [].sort,
  splice: [].splice,
};

// 方法拓展
A.extend = A.fn.extend = function () {
  var i = 1,
    len = arguments.length,
    target = arguments[0],
    j;
  if (i == len) {
    target = this;
    i--;
  }
  for (; i < len; i++) {
    for (j in arguments[i]) {
      target[j] = arguments[i][j];
    }
  }
  return target;
};

var demo = A.extend({ first: 1 }, { second: 2 }, { third: 3 });
console.log(demo);

A.fn.extend({
  on: function () {
    if (document.addEventListener) {
      return function (type, fn) {
        var i = this.length - 1;
        for (; i >= 0; i--) {
          this[i].addEventListener(type, fn, false);
        }
        return this;
      };
    } else if (document.attachEvent) {
      return function (type, fn) {
        var i = this.length - 1;
        for (; i >= 0; i--) {
          this[i].addEvent("on" + type, fn);
        }
        return this;
      };
    } else {
      return function (type, fn) {
        var i = this.length - 1;
        for (; i >= 0; i--) {
          this[i]["on" + type];
        }
        return this;
      };
    }
  },
});

A.extend({
  camelCase: function (str) {
    return str.replace(/\-(\w)/g, function (all, letter) {
      return letter.toUpperCase();
    });
  },
});

A.extend({
  css: function () {
    var arg = arguments,
      len = arg.length;
    if (this.length < 1) {
      return this;
    }
    if (len === 1) {
      if (typeof arg[0] === "string") {
        if (this[0].currentStyle) {
          return this[0].currentStyle[name];
        } else {
          return getComputedStyle(this[0], false)[name];
        }
      } else if (typeof arg[0] === "object") {
        for (var i in arg[0]) {
          for (var j = this.length - 1; j >= 0; j--) {
            this[j].style[A.camelCase(i)] = arg[0][i];
          }
        }
      }
    } else if (len === 2) {
      for (var j = this.length - 1; j >= 0; j--) {
        this[j].style[A.camelCase(arg[0])] = arg[1];
      }
    }
    return this;
  },
});

A.fn.extend({
  attr: function () {
    var arg = arguments,
      len = arg.length;
    if (this.length < 1) {
      return this;
    }
    if (len === 1) {
      if (typeof arg[0] === "string") {
        return this[0].getAttribute(arg[0]);
      } else if (typeof arg[0] === "object") {
        for (var i in arg[0]) {
          for (var j = this.length - 1; j >= 0; j--) {
            this[j].setAttribute(o, arg[0][i])
          }
        }
      }
    } else if (len === 2) {
      for (var j = this.length - 1; j >= 0; j--) {
        this[j].setAttribute(arg[0], arg[1])
      }
    }
    return this
  },
});


A.fn.extend({
  html: function() {
    var arg = arguments,
        len = arg.length
    if (len === 0) {
      return this[0] && this[0].innerHTML
    } else {
      for (var i =this.length  -1; i>=0; i--) {
        this[i].innerHTML = arg[0]
      }
    }
    return this
  }
})

// 测试
A('div')
.css({
  height: "20px",
  border: "1px solid #fff",
  "background-color": 'red'
})
.attr('class', 'demo')
.html("<p>add demo text</p>")
.on('click', function() {
  console.log('clicked')
})

