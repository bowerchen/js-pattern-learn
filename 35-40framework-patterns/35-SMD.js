/**
 * 模块化： 将复杂的系统分解成高内聚、低耦合的模块，使系统开发变得可控、可维护、可拓展，提高模块的复用率
 * 同步模块模式(SMD): 请求发出后，无论模块是否存在，立即执行后续的逻辑，实现模块开发中对模块的立即引用
 */

var F = F || {};

F.define = function (str, fn) {
  var parts = str.split("."),
    old = (parent = this),
    i = (len = 0);

  // 如果第一个模式是模块管理器单体对象，则移除
  if (parts[0] === "F") {
    parts = parts.slice(1);
  }

  // 屏蔽对define与module模块方法重写
  if (parts[0] === "define" || parts[0] === "module") {
    return;
  }

  // 遍历路由模块并定义每层模块
  for (len = parts.length; i < len; i++) {
    // 如果父模块中不存在当前模块
    if (typeof parent[parts[i]] === "undefined") {
      // 声明当前模块
      parent[parts[i]] = {};
    }
    // 缓存下一层级的祖父模块
    old = parent;
    // 缓存下一层级父模块
    parent = parent[parts[i]];
  }

  // 如果给定模块方法则定义该模块方法
  if (fn) {
    // 此时i等于parts.length, 故减一
    old[parts[--i]] = fn();
  }
  return this;
};

F.define("string", function () {
  return {
    trim: function (str) {
      return str.replace(/^\s+|\s+$/g, "");
    },
  };
});

F.define("dom", function () {
  var $ = function (id) {
    $.dom = document.getElementById(id);
    return $;
  };
  $.html = function (html) {
    if (html) {
      this.dom.innerHTML = html;
      return this;
    } else {
      return this.dom.innerHTML;
    }
  };
  return $;
});

F.define("dom.addClass");
F.dom.addClass = (function (type, fn) {
  return function (className) {
    if (!~this.dom.className.indexOf(className)) {
      this.dom.className += " " + className;
    }
  };
})();

// 模块调用方法
F.module = function () {
  // 参数转换为数组
  var args = [].slice.call(arguments),
    // 获取回调执行函数
    fn = args.pop(),
    // 获取依赖模块，如果args[0]是数组，则依赖模块为args[0]。否则依赖模块为arg
    parts = args[0] && args[0] instanceof Array ? args[0] : args,
    modules = {},
    modIDs = "",
    i = 0,
    ilen = parts.length, 
    parent,
    j,
    jlen;
  while (i < ilen) {
    // 如果是模块路由
    if (typeof parts[i] === "string") {
      parent = this;
      // 解析模块路由，并屏蔽掉模块父对象
      modIDs = parts[i].replace(/^F\./, "").split(".");
      // 遍历模块路由层级
      for (j = 0, jlen = modIDs.length; j < jlen; j++) {
        // 重置父模块
        parent = parent[modIDs[j]] || false;
      }
      // 将模块添加到依赖模块列表中
      modules.push(parent);
    } else {
      // 如果是模块对象，直接加入依赖模块列表中
      modules.push(parts[i]);
    }
    // 取下一个依赖模块
    i++;
  }
  // 执行回调执行函数
  fn.apply(null, modules);
};

F.module(['dom', document], function(dom, doc) {
  dom('test').html('new add!')
  doc.body.style.background = 'red'
})
