/**
 * 简单工厂模式
 */

// 案例一
var Basketball = function() {
    this.intro = '篮球盛行于美国'
}
Basketball.prototype = {
    getMember: function() {
        // 
    },
    getBallSize: function() {
        //
    }
}

var Football = function() {
    this.intro = "足球在世界范围内很流行"
}
Football.prototype = {
    getMember: function() {
        // 
    },
    getBallSize: function() {
        //
    }
}

var Tennis = function() {
    this.intro = "每年有很多网球系列赛"
}
Tennis.prototype = {
    getMember: function() {
        // 
    },
    getBallSize: function() {
        //
    }
}

var SportFactory = function(name) {
    switch(name) {
        case 'NBA':
            return new Basketball()
        case 'wordCup':
            return new Football()
        case "FrenchOpen":
            return new Tennis()
    }
}

var footnall = SportFactory('wordCup')
console.log(footnall)
console.log(footnall.intro)
footnall.getMember


// 案例2
function createBook(name, time, type) {
    var o = new Object()
    o.name = name
    o.time = time
    o.type = type
    o.getName = function() {
        console.log(this.name)
    }
    return o
}

var book1 = createBook('js book', 2014, 'js')
var book2 = createBook('css book', 20196, 'css')
book1.getName()
book2.getName()



// 案例3
function createPop(type, text) {
    var o = new Object()
    o.content = text
    o.show = function() {

    }
    if (type === 'alert') {

    }
    if (type === 'prompt') {

    }
    if (type === 'confirm') {

    }
    return o
}

var userNameAlert = createPop('alert', '用户名只能是26个字母和数字')