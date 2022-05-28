/**
 * 命令模式: 将请求与实现解耦并封装成独立对象，从而使不同的请求对客户端的实现参数化
 */

// 参考模板
var example = (function () {
  var Action = {
    create: function () {},
    display: function () {},
  };
  return function execute() {};
})();

var viewCommand = (function () {
  var tpl = {
      product: [
        "<div>",
        '<img src="{#src#}" />',
        "<p>{#text#}</p>",
        "</div>",
      ].join(""),
      title: [
        '<div class="title">',
        '<div class="main">',
        "<h2>{#title#}</h2>",
        "<p>{#tips#}</p>",
        "</div>",
        "</div>",
      ].join(""),
    },
    html = "";
  function formateString(str, obj) {
    return str.replace(/\{#(\w+)#\}/g, function (match, key) {
      return obj[key];
    });
  }
  // 方法集合
  var Action = {
    create: function (data, view) {
      if (data.length) {
        for (var i = 0, len = data.length; i < len; i++) {
          html += formateString(tpl[view], data[i]);
        }
      } else {
        html += formateString(tpl[view], data);
      }
    },
    display: function (container, data, view) {
      if (data) {
        this.create(data, view);
      }
      document.getElementById(container).innterHTML = html;
      html = "";
    },
  };
  return function execute(msg) {
      msg.param = Object.prototype.toString.call(msg.param) === "[object Array]" ? msg.param : [msg.param];
      Action[msg.param].apply(Action, msg.param)
  }
})();


var productData = [
    {
        src: "command/01.jpg",
        text: "jpg1"
    },
    {
        src: "command/02.jpg",
        text: "jpg2"
    },
    {
        src: "command/03.jpg",
        text: "jpg3"
    }
],
titleData = {
    title: "Title1 one",
    tips: "This is a tip"
}

viewCommand({
    command: 'display',
    param: [{
        src: 'command/1.jpg',
        text: "jpg1"
    }, 'product']
})