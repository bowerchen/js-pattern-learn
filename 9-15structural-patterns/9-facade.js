/**
 * 外观模式：为一组复杂的子系统接口提供一个更高级的统一接口，通过这个接口使得对子系统接口的访问更容易。
 */

// 案例1
function addEvent(dom, type, fn) {
    if (dom.addEventListener) {
        dom.addEventListener(type, fn, false);
    } else if (dom.attachEvent) {
        dom.attachEvent('on' + type, fn);
    } else {
        dom['on' + type] = fn
    }
}

// 测试用例
var myInput = document.getElementById('input')
addEvent(myInput, 'click', function() {
    console.log("绑定第一个事件")
})
addEvent(myInput, 'click', function() {
    console.log("绑定第二个事件")
})


// 案例2
var getEvent = function(event) {
    return event || window.event
}

var getTarget = function(event) {
    var event = getEvent(event)
    return event.target || event.srcElement
}

var preventDefault = function(event) {
    var event = getEvent(event)
    if (event.preventDefault()) {
        event.preventDefault()
    } else {
        event.returnValue = false
    }
}

// 测试用例
document.onclick = function(e) {
    preventDefault(e)
    if (getTarget(e) !== document.getElementById('input')) {
        hideInputSug()
    }
}


// 案例3 - 简约版属性样式方法库
var A = {
    g: function(id) {
        return document.getElementById(id)
    },
    css: function(id, key, value) {
        document.getElementById(id).style[key] = value
    },
    attr: function(id, key, value) {
        document.getElementById(id)[key] = value
    },
    html: function(id, html) {
        document.getElementById(id).innerHTML = html
    },
    on: function(id, type, fn) {
        document.getElementById(id)['on' + type] = fn
    }
}

// 测试用例
A.css('box', 'background', 'red')
A.attr('box', 'className', 'box')
