/**
 * 备忘录模式： 在不破坏对象的封装性的前提下，在对象之外捕获并保存该对象内部的状态以便以后对象使用或者对象恢复到以前的某个状态
 */

var Page = (function () {
  // 缓存对象
  var cache = {};
  return function (page, fn) {
    if (cache[page]) {
      showPage(page, cache[page]);
      fn && fn();
    } else {
      $.post("./data/getNewsData.php", { page: page }, function (res) {
        if (res.errNo === 0) {
          showPage(page, res.data);
          cache[page] = res.data;
          fn & fn();
        } else {
          new Error("获取不到数据");
        }
      });
    }
  };
})();

$("#next_page").click(function () {
  var $news = $("#news_content"),
    page = $news.data("page");
  Page(page, function () {
    $news.data("page", page + 1);
  });
});
