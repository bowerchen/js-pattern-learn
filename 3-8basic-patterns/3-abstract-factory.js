/**
 * 抽象工厂模式：通过对类的工厂抽象使其业务用于对产品类簇的创建，而不负责某一类产品的实例
 */

var VehicleFactory = function(subType, superType) {
    if (typeof VehicleFactory[superType] === 'function') {
        function F() {}  // 缓存类
        // 继承父类属性和方法
        F.prototype = new VehicleFactory[superType]();
        // 将子类 constructor 指向子类
        subType.constructor = subType
        // 子类原型继承“父类”
        subType.prototype = new F()
    } else {
        throw new Error("未创建该抽象类")
    }
}

// 小汽车抽象类
VehicleFactory.Car = function() {
    this.type = 'car'
}
VehicleFactory.Car.prototype = {
    getPrice: function() {
        return new Error('抽象方法不能调用')
    },
    getSpeed: function() {
        return new Error('抽象方法不能调用')
    }
}

// 公交车抽象类
VehicleFactory.Bus = function() {
    this.type = 'bus'
}
VehicleFactory.Bus.prototype = {
    getPrice: function() {
        return new Error('抽象方法不能调用')
    },
    getSpeed: function() {
        return new Error('抽象方法不能调用')
    }
}

// 小汽车抽象类
VehicleFactory.Truck = function() {
    this.type = 'truck'
}
VehicleFactory.Truck.prototype = {
    getPrice: function() {
        return new Error('抽象方法不能调用')
    },
    getSpeed: function() {
        return new Error('抽象方法不能调用')
    }
}

var BMW = function(price, speed) {
    this.price = price
    this.speed = speed
}
VehicleFactory(BMW, 'Car')
BMW.prototype.getPrice = function() {
    return this.price
}

var LamBorghini = function(price, speed) {
    this.price = price
    this.speed = speed
}
VehicleFactory(LamBorghini, 'Car')
LamBorghini.prototype.getSpeed = function() {
    return this.speed
}

var YUTONG = function(price, passenger) {
    this.price = price
    this.passenger = passenger
}
VehicleFactory(YUTONG, 'Bus')
YUTONG.prototype.getPrice = function() {
    return this.price
}
YUTONG.prototype.getPassenger = function() {
    return this.passenger
}

var BenzTruck = function(price, trainLoad) {
    this.price = price
    this.trainLoad = trainLoad
}
VehicleFactory(BenzTruck, 'Truck')
BenzTruck.prototype.getPrice = function() {
    return this.price
}
BenzTruck.prototype.getTrainLoad = function() {
    return this.trainLoad
}


// 测试用例
var truck = new BenzTruck(1000000, 1000)
console.log(truck.getPrice())
console.log(truck.type)
console.log(truck.getTrainLoad())
console.log(truck.getSpeed())