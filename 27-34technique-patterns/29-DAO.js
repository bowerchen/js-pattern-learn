/**
 * 数据访问对象模式(Data access object): 抽象和封装对数据源的访问与存储，DAO通过对数据源链接的管理方便对数据的访问与存储
 */

// 本地存储
var BaseLocalStorage = function (preId, timeSign) {
  this.preId = preId;
  this.timeSign = timeSign || "|-|";
};

BaseLocalStorage.prototype = {
  // 状态
  status: {
    SUCCESS: 0,
    FAILURE: 1,
    OVERFLOW: 2,
    TIMEOUT: 3,
  },
  storage: localStorage || window.localStorage,
  getKey: function (key) {
    return this.preId + key;
  },
  set: function (key, value, callback, time) {
    var status = this.status.SUCCESS,
      key = this.getKey(key);

    try {
      time = new Date(time).getTime() || time.getTime();
    } catch (e) {
      time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31;
    }

    try {
      this.storage.setItem(key, time + this.timeSign + value);
    } catch (e) {
      // 返回溢出状态
      status = this.status.OVERFLOW;
    }
    callback && callback.call(this, status, key, value);
  },
  get: function (key, callback) {
    var status = this.status.SUCCESS,
      key = this.getKey(key),
      value = null, // 默认值
      timeSignLen = this.timeSign.length, // 时间戳与存储数据之间的拼接符长度
      that = this, // 缓存当前对象
      index, // 时间戳与存储数据之间的拼接符起始位置
      time, // 时间戳
      result; // 最终获取的数据
    try {
      value = that.storage.getItem(key);
    } catch (e) {
      result = {
        status: that.status.FAILURE,
        value: null,
      };
      callback && callback.call(this, result.status, result.value);
      return result;
    }
    if (value) {
      index = value.indexOf(that.timeSign);
      time = +value.slice(0, index);
      if (new Date(time).getTime() > new Date().getTime() || time == 0) {
        value = value.slice(index + timeSignLen);
      } else {
        value = null;
        status = that.status.TIMEOUT;
        that.remove(key);
      }
    } else {
      status = that.status.FAILURE;
    }
    result = {
      status: status,
      value: value,
    };
    callback && callback.call(this, result.status, result.value);
    return result;
  },
  remove: function (key, callback) {
    var status = this.status.FAILURE,
      key = this.getKey(key),
      value = null;
    try {
      value = this.storage.getItem(key);
    } catch (e) {}
    if (value) {
      try {
        this.storage.removeItem(key);
        status = this.status.SUCCESS;
      } catch (e) {}
    }
    callback &&
      callback.call(
        this,
        status,
        status > 0
          ? null
          : value.slice(value.indexOf(this.timeSign) + this.timeSign.length)
      );
  },
};

// 测试
var LS = new BaseLocalStorage("LS__");
LS.set("a", "bowerchen", function () {
  console.log(arguments);
});
LS.get("a", function () {
  console.log(arguments);
});
LS.remove("a", function () {
  console.log(arguments);
});
LS.remove("a", function () {
  console.log(arguments);
});
LS.get("a", function () {
  console.log(arguments);
});

// 案例2 MongoDB
var MongoDB = {
  db: "demo",
  host: "localhost",
  port: 27017,
};

var d = new mongodb.Db(
  MongoDB.db,
  new mongodb.Server(MongoDB.host, MongoDB.port, { auto_reconnect: true }),
  { safe: true }
);

function connect(col, fn) {
  d.open(function (err, db) {
    if (err) throw err;
    else
      db.collection(col, function (err, col) {
        if (err) throw err;
        else fn && fn(col, db);
      });
  });
}

exports.DB = function (col) {
  return {
    insert: function (data, success, fail) {
      connect(col, function (col, db) {
        col.insert(data, function (err, docs) {
          if (err) fail && fail(err);
          else success && success(docs);
          db.close();
        });
      });
    },
    remove: function (data, success, fail) {
      connect(col, function (col, db) {
        col.remove(data, function (err, len) {
          if (err) fail && fail(err);
          else success && success(len);
          db.close();
        });
      });
    },
    update: function (con, doc, success, fail) {
      connect(col, function (col, db) {
        col.update(con, doc, function (err, len) {
          if (err) fail && fail(err);
          else success && success(len);
          db.close();
        });
      });
    },
    find: function (con, success, fail) {
      connect(col, function (col, db) {
        col.find(con).toArray(function (err, docs) {
          if (err) fail && fail(err);
          else success && success(docs);
          db.close();
        });
      });
    },
  };
};
