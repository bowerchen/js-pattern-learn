/**
 * 状态模式
 */

// 案例1
var ResultState = function () {
    // 判断结果保存在内部状态中
    var State = {
        state0: function () {
            console.log("这是state0情况")
        },
        state1: function () {
            console.log("这是state1情况")
        },
        state2: function () {
            console.log("这是state2情况")
        },
        state3: function () {
            console.log("这是state3情况")
        },
        state4: function () {
            console.log("这是state4情况")
        }
    }

    // 获取某一种状态并执行其对应的方法
    function show(result) {
        State['state' + result] && State['state' + result]()
    }

    return {
        // 返回调用状态方法接口
        show: show
    }
}


// 案例2 
// 超级玛丽
// ****单动作条件判断*****
var lastAction = ''
function changeMarry(action) {
    if (action === 'jump') {
        //
    } else if (action === 'move') {
        //
    } else {
        //
    }
    lastAction = action
}

// ****复合动作条件判断*****
var lastAction1 = ''
var lastAction2 = ''
function changeMarry(action1, action2) {
    if (action1 === 'shoot') {
        //
    } else if (action1 === 'jump') {
        //
    } else if (action1 === 'shoot' && action2 === 'jump') {
        //
    }
    lastAction1 = action1 || ''
    lastAction2 = action2 || ''
}

// 解决超级玛丽方案
var MarryState = function () {
    // 内部状态私有变量
    var _currentState = {},
        states = {
            jump: function () {
                //
            },
            move: function () {
                //
            },
            shoot: function () {
                //
            },
            squat: function () {
                //
            }
        }

    // 动作控制类
    var Action = {
        changeState: function () {
            var arg = arguments
            // 重置内部状态
            _currentState = {}
            // 如果有动作则添加动作
            if (arg.length) {
                for (var i = 0, len = arg.length; i < len; i++) {
                    // 向内部状态中添加动作
                    _currentState[arg[i]] = true
                }
            }
            return this
        },
        // 执行动作
        goes: function () {
            console.log("触发一次动作")
            for (var i in _currentState) {
                states[i] && states[i]()
            }
            return this
        }
    }
    return {
        change: Action.changeState,
        goes: Action.goes
    }
}

// 测试用例
MarryState()
.change('jump', 'shoot')
.goes()
.goes()
.change('shoot')
.goes()


var marry = new MarrayState()
marry.change('jump', 'shoot')
.goes()
.goes()
.change('shoot')
.goes()

