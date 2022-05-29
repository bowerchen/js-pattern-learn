/**
 * 享元模式： 运用共享技术有效地支持大量的细粒度的对象，避免对象间拥有相同内容造成多余的开销
 */

// 案例1
var FlyWeight = function () {
    var created = []
    function create() {
        var dom = document.createElement('div')
        document.getElementById('container').appendChild(dom)
        created.push(dom)
        return dom
    }
    return {
        getDiv: function () {
            if (created.length < 5) {
                return create()
            } else {
                var div = created.shift()
                created.push(div)
                return div
            }
        }
    }
}()

var paper = 0,
    num = 5,
    len = article.length

for (var i = 0; i < num; i++) {
    if (article[i]) {
        FlyWeight.getDiv().innerHTML = article[i]
    }
}

document.getElementById('next_page').onclick = function () {
    if (article.length < 5) {
        return
    }
    var n = ++paper * num % len,
        j = 0
    for (; j < 5; j++) {
        if (article[n + j]) {
            FlyWeight.getDiv().innerHTML = article[n + j]
        } else if (article[n + j - len]) {
            FlyWeight.getDiv().innerHTML = article[n + j - len]
        } else {
            FlyWeight.getDiv().innerHTML = ""
        }
    }
}


// 案例2
var FlyWeight = {
    moveX: function(x) {
        this.x = x
    },
    moveY: function(y) {
        this.y = y
    }
}

var Player = function(x, y, c) {
    this.x = x
    this.y = y
    this.color = c
}
Player.prototype = FlyWeight
Player.prototype.changeC = function(c) {
    this.color = c
}

var Spirit = function(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
}
Spirit.prototype = FlyWeight
Spirit.prototype.changeR = function(r) {
    this.r = r
}

// 测试案例
var player1 = new Player(5, 6, 'red')
console.log(player1)
player1.moveX(6)
player1.moveY(8)
player1.changeC('blue')
console.log(player1)

var spirit1 = new Spirit(2, 3, 4) 
console.log(spirit1)
spirit1.moveX(3)
spirit1.moveY(5)
spirit1.changeR(8)
console.log(spirit1)