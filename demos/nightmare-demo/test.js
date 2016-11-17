var Nightmare = require('nightmare');
var expect = require('chai').expect;
var fork = require('child_process').fork;

describe('test index.html', function() {
  var child;

  before(function (done) {
    child = fork('./server.js');
    child.on('message', function (msg) {
      if (msg === 'listening') {
        done();
      }
    });
  });

  after(function () {
    child.kill();
  });

  it('点击后标题改变', function (done) {
    var nightmare = Nightmare({ show: true });
    nightmare
      .goto('http://127.0.0.1:8080/index.html')
      .click('h1')
      .wait(1000)
      .evaluate(function () {
        let $h1 = document.querySelector('h1');
        return [$h1.textContent, window.getComputedStyle($h1).getPropertyValue("color")];
      })
      .end()
      .then(function(text) {
        expect(text[0]).to.equal('Hello Clicked');//不能直接比较数组么
        expect(text[1]).to.equal('rgb(255, 0, 0)');
        done();
      })
  });

});

