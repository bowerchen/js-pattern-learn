/**
 * 模板方法模式
 */

// 案例1 - 提示框归一化

// 基本提示框
var Alert = function (data) {
    if (!data) return
    this.content = data.content
    this.panel = document.createElement("div")
    this.contentNode = document.createElement("p")
    this.confirmBtn = document.createElement("span")
    this.closeBtn = document.createElement('b')
    this.panel.className = 'alert'
    this.closeBtn.className = 'a-close'
    this.confirmBtn.className = 'a-confirm'
    this.confirmBtn.innerHTML = data.confirm || '确认'
    this.contentNode.innerHTML = this.content
    this.success = data.success || function () { }
    this.fail = data.fail || function () { }
}

// 模板的原型方法
Alert.prototype = {
    init: function () {
        this.panel.appendChild(this.closeBtn)
        this.panel.appendChild(this.contentNode)
        this.panel.appendChild(this.confirmBtn)
        document.body.appendChild(this.panel)
        this.bindEvent()
        this.show()
    },
    bindEvent: function () {
        var that = this
        this.closeBtn.onclick = function () {
            that.fail()
            that.hide()
        }
        this.confirmBtn.onclick = function () {
            that.success()
            that.hide()
        }
    },
    hide: function () {
        this.panel.style.display = 'none'
    },
    show: function () {
        this.panel.style.display = 'block'
    }
}

// 根据模板创建类
var RightAlert = function (data) {
    Alert.class(this, data)
    this.confirmBtn.className = this.confirmBtn.className + ' right'
}
RightAlert.prototype = new Alert()

// 标题提示框
var TitleAlert = function (data) {
    Alert.class(this, data)
    this.title = data.title
    this.titleNode = document.createElement('h3')
    this.titleNode.innerHTML = this.title
}
TitleAlert.prototype = new Alert()
TitleAlert.prototype.init = function () {
    this.panel.insertBefore(this.titleNode, this.panel.firstChild)
    Alert.prototype.init.call(this)
}

// 取消按钮的弹出框
var CancelAlert = function (data) {
    TitleAlert.call(this, data)
    this.cancel = data.cancel
    this.cancelBtn = document.createElement('span')
    this.cancelBtn.className = 'cancel'
    this.cancelBtn.innerHTML = this.cancel || '取消'
}
CancelAlert.prototype = new Alert()
CancelAlert.prototype.init = function () {
    TitleAlert.prototype.init.call(this)
    this.panel.appendChild(this.cancelBtn)
}
CancelAlert.prototype.bindEvent = function () {
    var that = this
    TitleAlert.prototype.bindEvent.call(this)
    this.cancelBtn.onclick = function () {
        that.fail()
        that.hide()
    }
}


// 测试用例
new CancelAlert({
    title: '提示标题',
    content: '提示内容',
    success: function () {
        console.log('ok')
    },
    fail: function () {
        console.log('cancel')
    }
}).init()


// 案例2 - 多类导航
function formateString(str, data) {
    return str.replace(/\{#\w+#\}/g, function (match, key) {
        return typeof data[key] === undefined ? '' : data[key]
    })
}
var Nav = function (data) {
    this.item = '<a href="{#href#}" title="{#title}">{#name#}</a>'
    this.html = ''
    for (var i = 0, len = data.length; i < len; i++) {
        this.html += formateString(this.item, data[i])
    }
    return this.html
}
var NumNav = function (data) {
    var tpl = '<b>{#num#}</b>'
    for (var i = data.length - 1; i >= 0; i--) {
        data[i].name += data[i].name + formateString(tpl, data[i])
    }
    return Nav.call(this, data)
}
var LinkNav = function(data) {
    var tpl = '<span>{#link#}</span>'
    for (var i = data.length - 1; i >= 0; i--) {
        data[i].name += data[i].name + formateString(tpl, data[i])
    }
    return Nav.call(this, data)
}

// 测试用例
var nav = document.getElementById('content')
nav.innerHTML = NumNav([
    {
        href: 'http://www.baidu.com',
        title: '百度一下，你就知道',
        name: '百度',
        num: '10'
    }
])


