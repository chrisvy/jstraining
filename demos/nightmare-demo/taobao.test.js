var Nightmare = require('nightmare');//创建Nightmare实例
var nightmare = Nightmare({ show: true });//自动打开浏览器

nightmare
  .goto('https://www.taobao.com/')
  .type('#q', '电视机')//搜索框键入电视机
  .click('form[action*="/search"] [type=submit]')//点击搜索按钮
  .wait('#spulist-grid')//等待元素出现
  .evaluate(function () {//在页面内注入代码
    return document.querySelector('#spulist-grid .grid-item .info-cont')
      .textContent.trim();
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
