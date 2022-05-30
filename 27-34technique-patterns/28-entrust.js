/**
 * 委托模式： 多个对象接受并处理同一请求，他们将请求委托给另一个对象统一处理请求
 */

// 案例1 点击日历交互
var ul = document.getElementById('container')
    li = ul.getElementsByTagName('li')
for (; i >= 0; i--) {
  li[i].onclick = function() {
    this.style.backgroundColor = 'grey'
  }
}
// 委托模式
ul.onclick = function(e) {
  var e = e || window.event,
      tar = e.target || e.srcElement
  if (tar.nodeName.toLowerCase() === 'li') {
    tar.style.backgroundColor = 'grey'
  }
}


// 案例2  内存泄露
{/* 
<div id="btn_container">
  <button id="btn">demo</button>
</div> 
*/}
var g = function(id) {return document.getElementById(id)}
g('btn').onclick = function() {
  g('btn_container').innterHTML = '触发了事件'
}

// 委托模式
g('btn_container').onclick = function(e) {
  var target = e && e.target || window.event.srcElement
  if (target.id === 'btn') {
    g('btn_container').innerHTML = '触发了事件'
  }
}


// 案例3 数据分发
var Deal = {
  banner: function() {

  },
  aside: function(res) {

  },
  article: function(res) {

  },
  member: function(res) {

  },
  message: function(res) {

  }
}

$.get('./deal.php?', function(res) {
  for (var i in res) {
    Deal[i] && Deal[i](res[i])
  }
})
