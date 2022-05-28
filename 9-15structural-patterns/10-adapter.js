/**
 * 适配器模式
 */

// 案例1 - jQuery适配器
window.A = A = jQuery


// 案例2 - 适配异类框架
var A = A || {}
A.g = function(id) {
    return document.getElementById(id)
}
A.on = function(id, type, fn) {
    var dom = typeof id === 'string' ? this.g(id) : id
    if (dom.addEventListener) {
        dom.addEventListener(type, fn, false)
    } else if (dom.attachEvent) {
        dom.attachEvent('on' + type, fn)
    } else [
        dom['on' + type] = fn
    ]
}
A.on(window, 'load', function() {
    A.on('btn', 'click', function() {
        // do something
    })
})

// 适配jQuery
A.g = function(id) {
    return $(id).get(0)
}
A.on = function(id, type, fn) {
    var dom = typeof id === 'string' ? $('#'+id) : $(id)
    dom.on(type, fn)
}


// 案例3 - 参数适配器
function doSomething(obj) {
    var _adapter = {
        name: 'bower',
        title: '学习JavaScript设计模式',
        age: 24,
        color: 'blue',
        size: 100,
        price: 0
    }
    for (var i in _adapter) {
        _adapter[i] = obj[i] || _adapter[i]
    }

    // do something
}


// 案例4 - 数据适配
var arr = ['JavaScript', 'book', '前端编程语言', '10月1日']
function arrToObjAdapter(arr) {
    return {
        name: arr[0],
        type: arr[1],
        title: arr[2],
        data: arr[3]
    }
}

var adapterData = arrToObjAdapter(arr)
console.log(adapterData)


// 案例5 - 服务器端数据适配
function ajaxAdapter(data) {
    return [data['key1'], data['key2'], data['key3']]
}
$.ajax({
    url: 'someAdress.php',
    success: function(data, status) {
        if (data) {
            doSomething(ajaxAdapter(data))
        }
    }
})
