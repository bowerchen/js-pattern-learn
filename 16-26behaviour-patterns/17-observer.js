/**
 * 观察者模式 - 发布-订阅者模式或者消息机制。定义了一种依赖关系，解决了主体对象与观察者之间功能的耦合
 */

/**  重要   */
var Observer = (function() {
    var __messages = {}
    return {
        // 注册消息接口
        register: function(type, fn) {
            if (typeof __messages[type] === 'undefined') {
                __messages[type] = [fn]
            } else {
                __messages[type].push(fn)
            }
        },
        // 发布消息接口
        fire: function(type, args) {
            if (!__messages[type]) return
            var events = {
                type: type,
                args: args || {}
            }
            var i = 0,
                len = __messages[type].length
            for(; i < len; i++) {
                // 依此执行注册的消息对应的动作序列
                __messages[type][i].call(this, events)
            }
        },
        // 移除消息接口
        remove: function(type, fn) {
            if(__messages[type] instanceof Array) {
                var i = __messages[type].length - 1
                for (; i>=0; i--) {
                    __messages[type][i] === fn && __messages[type].splice(i, 1)
                }
            }
        }
    }
})()

// 测试用例
Observer.register('test', function(e) {
    console.log(e.type, e.args.msg)
})

// Observer.fire('test', {msg: '传递参数'})
// Observer.fire('test', {msg: '传递参数1'})


// 案例1
function $(id) {
    return document.getElementById(id)
}

// 追加消息
(function() {
    function addMsgItem(e) {
        var text = e.args.text,
            ul = $('msg'),
            li = document.createElement('li'),
            span = document.createElement('span')
        li.innerHTML = text
        // 关闭按钮
        span.onclick = function() {
            ul.removeChild(li)
            // 发布删除留言消息
            Observer.fire('removeCommentMessage', {
                num: -1
            })
        }
        li.appendChild(span)
        ul.appendChild(li)
    }
    // 注册添加评论消息
    Observer.register('addCommentMessage', addMsgItem)
})()

// 更改用户消息数目
(function() {
    function changeMsgNum(e) {
        var num = e.args.num
        $('msg_num').innerHTML = parseInt($('msg_num').innerHTML) + num
    }
    // 注册添加评论消息
    Observer
        .register('addCommentMessage', changeMsgNum)
        .register('removeCommentMessage', changeMsgNum)
})()

// 用户点击提交
(function() {
    $('user_submit').onclick = function() {
        var text = $('user_input')
        if (text.value === '') return
        // 发布一则评价消息
        Observer.fire('addCommentMessage', {
            text: text.value,
            num: 1
        })
        text.value = ''
    }
})()


// 案例2
var Student = function(result) {
    var that = this
    that.result = result
    that.say = function() {
        console.log(that.result)
    }
}
Student.prototype.answer = function(question) {
    // 注册参数问题
    Observer.register(question, this.say)
}
Student.prototype.sleep  = function(question) {
    console.log(this.result + ' ' + question + ' 已被注销')
    // 取消监听
    Observer.remove(question, this.say)
}

var Teacher = function() {}
Teacher.prototype.ask = function(question) {
    console.log('问题是：' + question)
    // 发布提问消息
    Observer.fire(question)
}

// 测试用例
var student1 = new Student('学生1回答问题')
var student2 = new Student('学生2回答问题')
var student3 = new Student('学生3回答问题')

student1.answer('什么是设计模式')
student1.answer('简述观察者模式')
student2.answer('什么是设计模式')
student3.answer('什么是设计模式')
student3.answer('简述观察者模式')
student3.sleep('简述观察者模式')

var teacher =  new Teacher()
teacher.ask('什么是设计模式')
teacher.ask('简述观察者模式')

