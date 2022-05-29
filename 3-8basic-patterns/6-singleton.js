/**
 * 单例模式 - 单体模式，只允许实例化一次的对象类
 */


// 案例1
let example = {
    method1: function() {
        // 
    },
    method2: function() {
        // 
    },
    method3: function() {
        // 
    },
}


// 案例2
let A = {
    Util: {
        util_method1: function() {},
        util_method2: function() {},
    },
    Tool: {
        tool_method1: function() {},
        tool_method2: function() {},
    },
    Ajax: {
        get: function() {},
        post: function() {}
    }
}


// 案例3(静态变量 - 私有变量)
var Conf = (function() {
    var conf = {
        MAX_NUM: 1000,
        MIN_NUM: 100,
        COUNT: 1000
    }
    return {
        get: function(name) {
            return conf[name] ? conf[name] : null
        }
    }
})()

var count = Conf.get('COUNT')
console.log(count)


// 案例4(惰性单例 - 私有方法)
var LazySingle = (function() {

    var _instance = null
    function Single() {
        return {
            publicMethod: function() {},
            publicProperty: '1.0'
        }
    }

    return function() {
        if (!_instance) {
            _instance = Single()
        }
        return _instance
    }

})()

console.log(LazySingle().publicProperty)
