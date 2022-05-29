const { inheritPrototype } = require('../inherit') 

/**
 * 组合模式 - 部分-整体模式。 将对象组合成树性结构以表示"部分整体"的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性
 */

var News = function() {
    this.children = []
    this.element  = null
}
News.prototype = {
    init: function() {
        throw new Error('请重写你的方法')
    },
    add: function() {
        throw new Error('请重写你的方法')
    },
    getElement: function() {
        throw new Error('请重写你的方法')
    }
}


var Container = function(id, parent) {
    News.call(this)
    this.id = id
    this.parent = parent
    this.init()
}
inheritPrototype(Container, News)
Container.prototype.init = function() {
    this.element = document.createElement('ul')
    this.element.id = this.id
    this.element.className = 'new-container'
}
Container.prototype.add = function(child) {
    this.children.push(child)
    this.element.appendChild(child.getElement())
    return this
}
Container.prototype.getElement = function() {
    return this.element
}
Container.prototype.show = function() {
    this.parent.appendChild(this.element)
}


var Item = function(classname) {
    News.call(this)
    this.classname = classname || ''
    this.init()
}
inheritPrototype(Item, News)
Item.prototype.init = function() {
    this.element = document.createElement('li')
    this.element.className = this.classname
}
Item.prototype.add = function(child) {
    this.children.push(child)
    this.element.appendChild(child.getElement())
    return this
}
Item.prototype.getElement = function() {
    return this.element
}


var NewsGroup = function(classname) {
    News.call(this)
    this.classname = classname || ''
    this.init()
}
inheritPrototype(NewsGroup, News)
NewsGroup.prototype.init = function() {
    this.element = document.createElement('div')
    this.element.classname = this.classname
}
NewsGroup.prototype.add = function(child) {
    this.children.push(child)
    this.element.appendChild(child.getElement())
    return this
}
NewsGroup.prototype.getElement = function() {
    return this.element
}
