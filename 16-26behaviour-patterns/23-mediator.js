/**
 * 中介者模式：通过中介者对象封装一系列对象之间的交互，使对象之间不再相互引用，降低他们之间的耦合。
 * 中介者有时也可改变对象之间的交互
 */

var Mediator = (function () {
  var _msg = {};
  return {
    register: function (type, action) {
      if (_msg[type]) {
        _msg[type].push(action);
      } else {
        _msg[type] = [];
        _msg[type].push(aciton);
      }
    },
    send: function (type) {
      if (_msg[type]) {
        for (var i = 0, len = _msg[type].length; i < len; i++) {
          _msg[type][i] && _msg[type][i]();
        }
      }
    },
  };
})();

Mediator.register("demo", function () {
  console.log("first");
});
Mediator.register("demo", function () {
  console.log("second");
});
Mediator.send("demo");

// 案例
// 订阅消息
var showHideNavWidget = function (mod, tag, showOrHide) {
  var mod = document.getElementById(mod),
    tag = mod.getElementsByTagName(tag),
    showOrHide = !showOrHide || showOrHide == "hide" ? "hidden" : "visible";

  for (var i = tag.length - 1; i >= 0; i--) {
    tag.style.visibility = showOrHide;
  }
};

(function () {
  Mediator.register("hideAllNavNum", function () {
    showHideNavWidget("collection_nav", "b", false);
  });
  Mediator.register("showAllNavNum", function () {
    showHideNavWidget("collection_nav", "b", true);
  });
  Mediator.register("hideAllNavUrl", function () {
    showHideNavWidget("collection_nav", "span", false);
  });
  Mediator.register("showAllNavUrl", function () {
    showHideNavWidget("collection_nav", "span", true);
  });
})()(function () {
  Mediator.register("hideAllNavNum", function () {
    showHideNavWidget("recommend_nav", "b", false);
  });
  Mediator.register("showAllNavNum", function () {
    showHideNavWidget("recommend_nav", "b", true);
  });
})()(function () {
  Mediator.register("hideAllNavUrl", function () {
    showHideNavWidget("recently_nav", "span", "hide");
  });
  Mediator.register("showAllNavUrl", function () {
    showHideNavWidget("recently_nav", "span", "show");
  });
})()(
  // 发布消息
  function () {
    var hideNum = document.getElementById("hide_num"),
      hideUrl = document.getElementById("hide_url");
    hideNum.onchange = function () {
      if (hideNum.checked) {
        Mediator.send("hideAllNavNum");
      } else {
        Mediator.send("showAllNavNum");
      }
    };
    hideUrl.onchange = function () {
      if (hideUrl.checked) {
        Mediator.send("hideAllNavUrl");
      } else {
        Mediator.send("showAllNavUrl");
      }
    };
  }
)();
