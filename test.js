require('mocha-generators').install();

var Nightmare = require("nightmare");
var assert = require("chai").assert;
var co = require("co");
var http = require('http');
var path = require('path');
var fs = require('fs');


var PORT = 7500;
var ASSERT_SIZE = 200;
//线上测试
describe('resize-image', function () {
  // start server
 /* before(function (done) {
    require('./server').listen(PORT, done);
  });*/
  // test `.resize`
  it('.resize: Resize any image to ' + ASSERT_SIZE, function* () {
    this.timeout(200000);
    var nightmare = Nightmare({
      show: true,
      openDevTools: {
        mode: 'detach'
      }
  }); // 不要 show 了

 

  var selector = '.inputFile';
    var min = yield nightmare
      .goto('http://localhost:' + PORT + '/index')
      //.wait(50000)
      .evaluate(function (selector, imgSrc, readStream) {
        //浏览器运行环境
        //var img = new Image();
        var img = document.getElementById('img');
        //img.src = imgSrc;
        /*reg.canvasResize(readStream, {
          callback: function(baseStr) {
            return baseStr.length;
          }
        });*/
        return readStream;
      }, selector, imgSrc, readStream)
      .then(function(text) {
        console.log(text);
      });
      //.screenshot('./a.png');
    yield nightmare.end();
    assert.equal(min, 'Hello world');
  });
  
});
