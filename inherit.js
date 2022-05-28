/**
 * 原型式继承
 */
function inheritObject(o) {
    function F() {}
    F.prototype = o
    return new F()
}


/**
 * 寄生组合式继承
 */
function inheritPrototype(subClass, superClass) {
    // 复制一份父类的原型副本保存在变量中
    var p = inheritObject(superClass.prototype) 
    // 修正子类的constructor属性
    p.constructor = subClass
    // 设置子类的原型
    subClass.prototype = p
}