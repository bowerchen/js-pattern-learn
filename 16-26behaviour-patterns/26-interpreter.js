/**
 * 解释器模式：对于一种语言，给出其文法表示形式，并定义一种解释器，通过使用这种解释器来解释语言中定义的句子
 */

// 获取兄弟元素名称
function getSublingName(node) {
  if (node.previousSibling) {
    var name = "",
      count = 1,
      nodeName = node.nodeName,
      sibling = node.previousSibling;
    while (sibling) {
      if (
        sibling.nodeType == 1 &&
        sibling.nodeType === node.nodeType &&
        sibling.nodeName
      ) {
        if (nodeName == sibling.nodeName) {
          name += ++count;
        } else {
          count = 1;
          name += "|" + sibling.nodeName.toUpperCase();
        }
      }
      sibling = sibling.previousSibling;
    }
    return name;
  } else {
    return "";
  }
}

// 解释器
var Interpreter = (function() {
  function getSublingName(node) {
    // ...
  }
  return function(node, wrap) {
    var path = [],
        wrap = wrap || document
    // 如果当前（目标）节点等于容器节点
    if (node === wrap) {
      // 容器节点为元素
      if (wrap.nodeType === 1) {
        // 路径数组中输入容器节点名称
        path.push(wrap.nodeName.toUpperCase())
      }
      return path
    }
    // 如果当前节点的父节点不等于容器节点
    if (node.parentNode !== wrap) {
      path = arguments.callee(node.parentNode, wrap)
    } else { // 如果当前节点的父节点与容器节点相等
      // 容器节点为元素
      if (wrap.nodeType === 1) {
        path.push(wrap.nodeName.toUpperCase())
      }
    }
    // 获取元素的兄弟元素名称统计
    var sublingNames = getSublingName(node)
    // 如果节点为元素
    if (node.nodeType === 1) {
      path.push(node.nodeName.toUpperCase() + sublingNames)
    }
    return path
  }
})()