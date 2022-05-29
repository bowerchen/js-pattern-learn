/**
 * 桥接模式 - 在系统沿着多个维度变化的同时，又不增加其复杂度并已达到解耦(提取共同点)
 */

// 案例1
function changeColor(dom, color, bg) {
    dom.style.color = color
    dom.style.backgroundColor = bg
}

// 测试用例
var spans = document.getElementsByTagName('span')
spans[0].onmouseover = function() {
    changeColor(this, 'red', '#ddd')
}
spans[0].onmouseout = function() {
    changeColor(this, 'green', '#f5f5f5')
}


// 案例2 - 多元化对象
// 运动单元
function Speed(x, y) {
    this.x = x
    this.y = y
}
Speed.prototype.run = function() {
    console.log('运动起来')
}

// 着色单元
function Color(cl) {
    this.color = cl
}
Color.prototype.draw = function() {
    console.log('绘制色彩')
}

// 变形单元
function Shape(sp) {
    this.shape = sp
}
Shape.prototype.change = function() {
    console.log('改变形状')
}


// 说话单元
function Speek(wd) {
    this.word = wd
}
Speek.prototype.say = function() {
    console.log('书写字体')
}


function Ball(x, y, c) {
    this.speed = new Speed(x, y)
    this.color = new Color(c)
}
Ball.prototype.init = function() {
    this.speed.run()
    this.color.draw()
}

function People(x, y, f) {
    this.speed = new Speed(x, y)
    this.speek = new Speek(f)
}
People.prototype.init = function() {
    this.speed.run()
    this.speek.say()
}

function Spirite(x, y, c, s) {
    this.speed = new Speed(x, y)
    this.color = new Color(c)
    this.shape = new Shape(s)
}
Spirite.prototype.init = function() {
    this.speed.run()
    this.color.draw()
    this.shape.change()
}


// 测试用例
var p = new People(10, 12, 16)
p.init()

