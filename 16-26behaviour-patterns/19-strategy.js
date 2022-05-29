/**
 * 策略模式：将定义的一组算法封装起来，使其相互之间可以替换。封装的算法具有一定的独立性，不会随客户端变化而变化
 */

// 案例1
var PriceStrategy = function () {
    // 内部算法对象
    var strategy = {
        return30: function (price) {
            return +price + parseInt(price / 100) * 30
        },
        return50: function (price) {
            return +price + parseInt(price / 100) * 50
        },
        percent90: function (price) {
            return price * 100 * 90 / 10000
        },
        percent80: function (price) {
            return price * 100 * 80 / 10000
        },
        percent50: function (price) {
            return price * 100 * 50 / 10000
        }
    }
    // 策略算法调用接口
    return function(algorithm, price) {
        return strategy[algorithm] && strategy[algorithm](price)
    }
}()

var price = PriceStrategy('return50', '100')
console.log(price)


// 案例2 - 表单验证
var InputStrategy = function() {
    var strategy = {
        // 是否为空
        notNull: function(value) {
            return /\s+/.test(value) ? '请输入内容' : ''
        },
        // 是否是一个数字
        number: function(value) {
            return /^[0-9]+(\.[0-9]+)$/.test(value) ? '' : '请输入一个数字'
        },
        // 是否是本地电话
        phone: function(value) {
            return /^\d{3}\-\d{8}$|^\d{4}\-\d{7}$/.test(value) ? '' : '请输入正确的电话号码格式'
        }
    }
    return {
        // 验证接口
        check: function(type, value) {
            value = value.replace(/^\s+|\s+$/g, '')
            return strategy[type] ? strategy[type](value) : '没有该类型的检测方法'
        },
        // 添加策略
        addStrategy: function(type, fn) {
            strategy[type] = fn
        }
    }
}
