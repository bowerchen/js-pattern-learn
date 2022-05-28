/**
 * 职责链模式： 解决请求的发送者与请求的接受者之间的耦合，
 * 通过职责链上的多个对象对分解请求流程，实现请求在多个对象之间的传递，知道最后一个对象完成请求
 */

/**
 * 异步请求对象
 * @param {*} data        请求数据
 * @param {*} dealType    响应数据处理对象
 * @param {*} dom         事件源
 */
var sendData = function (data, dealType, dom) {
  var xhr = new XMLHttpRequest(),
    url = "getData.php?mod=userInfo";

  xhr.onload = function (event) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      dealData(xhr.responseText, dealType, dom);
    } else {
      new Error("请求失败");
    }
  };
  // 拼接字符串
  for (var i in data) {
    url += "&" + i + "=" + data[i];
  }
  // 发送异步请求
  xhr.open("GET", url, true);
  xhr.send(null);
};

/**
 * 处理响应数据
 * @param {*} data        请求数据
 * @param {*} dealType    响应数据处理对象
 * @param {*} dom         事件源
 */
var dealData = function (data, dealType, dom) {
  var dataType = Object.prototype.toString.call(data);
  switch (dealType) {
    // 输入框提示功能
    case "sug":
      // 如果数据为数组
      if (dataType === "[Object Array]") {
        return createSug(data, dom);
      }
      // 将响应的对象数据转化为数组
      if (dataType === "[Object Object]") {
        var newData = [];
        for (var i in data) {
          newData.push(data[i]);
        }
        return createSug(newData, dom);
      }
      // 将响应的其他数据转化为数组
      return createSug([data], dom);
      break;
    case "validate":
      return createValidataResult(data, dom);
      break;
  }
};

/**
 * 创建提示框组件
 * @param {*} data  响应适配数据
 * @param {*} dom   事件源
 */
var createSug = function (data, dom) {
  var i = 0,
    len = data.length,
    html = "";
  for (; i < len; i++) {
    html += "<li>" + data[i] + "</li>";
  }
  dom.parentNode.getElementsByTagName("ul")[0].innerHTML = html;
};

/**
 * 创建校验组件
 * @param {*} data   响应适配数据 
 * @param {*} dom    事件源
 */
var createValidataResult = function (data, dom) {
  dom.parentNode.getElementsByTagName("span")[0].innerHTML = data;
};


// 测试
dealData("用户名不正确", 'validate', input[0])
dealData(123, 'sug', input[1])
dealData(['爱奇艺', '阿里巴巴', '爱漫画'], 'sug', input[1])
dealData({'iqy': '爱奇艺', 'albb': '阿里巴巴', 'imhh': '爱漫画'}, 'sug', input[1])

var createSug = function(data, dom) {
    console.log(data, dom, 'createSug')
}
var createValidataResult = function(data, dom) {
    console.log(data, dom, 'createValidataResult')
}


var input = document.getElementsByTagName('input')
input[0].onchange = function(e) {
    sendData({value: input[0].value}, 'validate', input[0])
}
input[1].onkeydown = function(e) {
    sendData({value: input[1].value}, 'sug', input[1])
}