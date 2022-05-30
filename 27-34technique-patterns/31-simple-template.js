/**
 * 简单模板模式： 通过格式化字符串拼凑出试图避免创建试图时大量节点操作。优化内存开销
 */

var A = A || {};

// 模板渲染方法
A.formateString = function (str, data) {
  return str.replace(/\{#(\w+)#\}/g, function (match, key) {
    return typeof data[key] === undefined ? "" : data[key];
  });
};

// 模板生成器
A.view = function (name) {
  var v = {
    code: "<pre><code>{#code#}</code></pre>",
    img: '<img src="{#src#}" alt="{#alt#}" title="{#title#}" />',
    part: '<div id="{#id#}" class="{#class}">{#part#}</div>',
    theme: ["<div>", "<h1>{#title#}</h1>", "{#content#}", "</div>"].join(""),
  };

  if (Object.prototype.toString.call(name) === "[object Array]") {
    var tpl = "";
    for (var i = 0, len = name.length; i < len; i++) {
      tpl += arguments.callee(name[i]);
    }
    return tpl;
  } else {
    return v[name] ? v[name] : "<" + name + ">{#" + name + "#}</" + name + ">";
  }
};


