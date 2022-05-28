/**
 * 建造者模式
 */

var Human = function(param) {
    this.skill = param && param.skill || '保密'
    this.hobby = param && param.hobby || '保密'
}
Human.prototype = {
    getSkill: function(skill) {
        return this.skill
    },
    getHobby: function(hobby) {
        return this.hobby
    }
}

var Named = function(name) {
    // var that = this
    // 构造器
    (function(name, that) {
        that.wholeName = name
        if (name.indexOf(' ') > -1) {
            that.FirstName = name.slice(0, name.indexOf(' '))
            that.secondName = name.slice(name, name.indexOf(' '))
        }
    })(name, this)
}

var Work = function(work) {
    // var that = this
    // 构造器
    (function(work, that) {
        switch(work) {
            case 'code':
                that.work = '工程师'
                that.workDescription = '每天沉醉于编程'
                break
            case 'UI':
            case 'UE':
                that.work = '设计师'
                that.workDescription = '设计更似一种艺术'
                break
            case 'teacher':
                that.work = '教师'
                that.workDescription = '分享也是一种快乐'
                break
            default:
                that.work = work
                that.workDescription = '对不起，我们还不清楚您所选择职位的相关描述'
        }
    })(work, this)
}
Work.prototype.changeWork = function(work) {
    this.work = work
}
Work.prototype.changeDescription = function(description) {
    this.workDescription = description
}

/**
 * 使用建造者模式设计 应聘者描述
 */
var Person = function(name, work) {
    var _person = new Human()
    _person.name = new Named(name)
    _person.work = new Work(work)
    return _person
}


// 测试用例
var person = new Person('bower chen', 'code')
console.log(person.skill)
console.log(person.name.FirstName)
console.log(person.work.work)
console.log(person.work.workDescription)
person.work.changeWork('UI')
console.log(person.work.work)
console.log(person.work.workDescription)
