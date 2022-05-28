/**
 * 代理模式
 */

// 案例1 - 通过img标签src属性发送请求
var Count = (function() {
    var _img = new Image()
    return function(param) {
        var str = 'http://www.*.com/a.gif?'
        for (var i in param) {
            str += '&' + i + '=' + param[i]
            _img.src = str
        }
    }
})()
Count({num: 10})


// 案例2 - JSONP
// 案例3 - iframe
