/**
 * 异步模块模式-AMD：请求发出后，继续其他业务逻辑，知道模块加载完成执行后续的逻辑，实现模块开发中对模块加载完成后的引用
 */

F.module = function (url, modDeps, modCallback) {
  var args = [].slice.call(arguments),
    callback = args.pop(),
    deps =
      args.length && args[args.length - 1] instanceof Array ? args.pop() : [],
    url = args.length ? args.pop() : null,
    params = [],
    depsCount = 0,
    i = 0,
    len;
  if ((len = deps.length)) {
    while (i < len) {
      (function (i) {
        depsCount++;
        loadModule(deps[i], function (mod) {
          params[i] = mod;
          depsCount--;
          if (depsCount === 0) {
            setModule(url, params, callback);
          }
        });
      })(i);
      i++;
    }
  } else {
    setModule(url, [], callback);
  }
};

var moduleCache = {},
  setModule = function (moduleName, params, callback) {
    var _module, fn
    if (moduleCache[moduleName]) {
      _module = moduleCache[moduleName]
      _module.status = 'loaded'
      _module.exports = callback ? callback.apply(_module, params) : null;
      while(fn = _module.onload.shift()) {
        fn(_module.exports)
      }
    } else {
      callback && callback.apply(null, params)
    }
  },
  loadModule = function (moduleName, callback) {
    var _module;
    if (moduleCache[moduleName]) {
      _module = moduleCache[moduleName];
      if (_module.status === "loaded") {
        setTimeout(callback(_module.exports), 0);
      } else {
        _module.onload.push(callback);
      }
    } else {
      moduleCache[moduleName] = {
        moduleName: moduleName,
        status: "loading",
        exports: null,
        onload: [callback],
      };
      loadModule(getUrl(moduleName));
    }
  },
  getUrl = function (moduleName) {
    return String(moduleName).replace(/\.js/g, '') + '.js'
  },
  loadScript = function (src) {
    var _script = document.createElement('script')
    _script.type = 'text/JavaScript'
    _script.charset = 'UTF-8'
    _script.async = true
    _script.src = src
    document.getElementsByTagName('head')[0].appendChild(_script)
  };


F.module('lib/dom', function() {
  return {
    g: function(id) {
      return document.getElementById(id)
    },
    html: function(id, html) {
      if (html) {
        this.g(id).innerHTML = html
      } else {
        return this.g(id).innerHTML
      }
    }
  }
})

F.module('lib/event', ['lib/dom'], function(dom) {
  var events = {
    on: function(id, type, fn) {
      dom.g(id)['on' + type] = fn
    }
  }
  return events;
})

F.module(['lib/event', 'lib/dom'], function(events, dom) {
  events.on('demo', 'click', function() {
    dom.html('demo', 'success')
  })
})