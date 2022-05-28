/**
 * 装饰者模式
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
