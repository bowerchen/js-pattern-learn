/**
 * 工厂方法模式 - 安全模式(instanceof): 通过对产品类的抽象使其创建业务主要负责用于创建多类产品的实例
 */

var Factory = function(type, content) {
    if (this instanceof Factory) {
        var s = new this[type](content)
        return s
    } else {
        return new Factory(type, content)
    }
}

Factory.prototype = {
    Java: function() {
        // 
    },
    JavaScript: function() {
        // 
    },
    PHP: function() {
        // 
    },
    UI: function() {
        // 
    },
}


var data = [
    {type: 'JavaScript', content: 'JavaScript哪家强'},
    {type: 'Java', content: 'Java哪家强'},
    {type: 'PHP', content: 'PHP哪家强'},
    {type: 'UI', content: 'UI哪家强'}
]

for(var i=data.length; i >=0 ; i-- ) {
    Factory(data[i].type, date[i].content)
}