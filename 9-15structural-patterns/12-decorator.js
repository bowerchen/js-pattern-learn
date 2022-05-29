/**
 * 装饰者模式：在不改变原对象的基础上，通过对其进行包装拓展(添加属性或者方法)使原有对象可以满足用户的更复杂需求
 */

var decorator = function(input, fn) {
    var input = document.getElementById(input)
    if (typeof input.onclick === 'function') {
        var oldClick = input.onclick
        input.onclick = function() {
            oldClick()
            fn()
        }
    } else {
        input.onclick = fn
    }

    // do something
}

// 测试用例
decorator('tel_input', function() {
    document.getElementById('tel_demo_text').style.display = 'none'
})
decorator('name_input', function() {
    document.getElementById('name_demo_text').style.display = 'none'
})
decorator('address_input', function() {
    document.getElementById('address_demo_text').style.display = 'none'
})
