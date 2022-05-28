/**
 * 原型模式 - 用原型实例指向创建对象的类，使用于创建新的对象的类共享原型对象的属性和方法
 */

var LoopImages = function (imgArr, container) {
    this.imagesArray = imgArr
    this.container = container
}
LoopImages.prototype = {
    // 创建轮播图片
    createImage: function () {
        console.log('LoopImages createImages function')
    },
    // 切换下一张图片
    changeImage: function () {
        console.log('LoopImages changeImage function')
    }
}

// 上下滑动切换类
var SlideLoopImg = function (imgArr, container) {
    LoopImages.call(this, imgArr, container)
}
SlideLoopImg.prototype = new LoopImages()
SlideLoopImg.prototype.changeImage = function () {
    console.log('SlideLoopImg changeImage function')
}

// 渐隐切换类
var FadeLoopImg = function (imgArr, container, arrow) {
    LoopImages.call(this, imgArr, container)
    this.arrow = arrow
}
FadeLoopImg.prototype = new LoopImages()
FadeLoopImg.prototype.changeImage = function () {
    console.log('FadeLoopImg changeImage function')
}

// 测试用例
var fadeImg = new FadeLoopImg([
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
], 'slide', [
    'left.jpg',
    'right.jpg'
])
console.log(fadeImg.container)
fadeImg.changeImage()


/**
 * 基于已经存在的模板对象克隆出新对象的模式（浅复制）
 */
function prototypeExtend() {
    var F = function () { },
        args = arguments,
        i = 0,
        len = args.length
    for (; i < len; i++) {
        // 遍历每个模板对象中的属性
        for (var j in args[i]) {
            F.prototype[j] = args[i][j]
        }
    }
    return new F()
}

var penguin = prototypeExtend({
    speed: 20,
    swim: function() {
        console.log('游泳速度 ' + this.speed)
    },
    run: function(speed) {
        console.log('奔跑速度 ' + speed)
    },
    jump: function() {
        console.log('跳跃动作')
    }
})
penguin.swim()
penguin.run(10)
penguin.jump()
