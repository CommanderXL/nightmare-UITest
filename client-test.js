require('mocha-generators').install();

var Nightmare = require("nightmare");
require('nightmare-upload')(Nightmare);
var assert = require("chai").assert;
var co = require("co");
var http = require('http');
var path = require('path');
var fs = require('fs');

var url = 'http://10.94.97.125:8080/static/taxi-driver/src/pages/chuanliu/reg-register.html?v=1&';
var token = 'x3nAvXckyDOY8YP3qtZfShxaqGkV8-OAYm7TilsCqG2qVkpUslJS0lFKUrKyNLHUUUpRsjI0NDPUUUpVsqpWKkgsLi7PLwIJmpibGJsYmBtZ6CgV55cWJQPlDWp1lNJQpdKBphkaG0CBBdDgDIj5mSDlgAAAAP__';


var Dom = {
    userName: '#user-name',
    userId: '#user-id'
};

//路径
var urlFix = function(root) {
    return function(p) {
        return path.join(root, p);
    }
};


describe('reg-register Page test', function() {

    //需要打开窗口的时候单独另开一个describe
    /*var nightmare;

    beforeEach(function() {
        nightmare = Nightmare();
        nightmare.viewport(375, 500);   //控制viewport的大小
    });

    afterEach(function*() {
        yield nightmare.end();
    });*/

    //名称
    /*it('user has the name', function* () {
        this.timeout(15000);
       
        var nightmare = Nightmare();
        var userNameEl = '#user-name',
            userId = "#user-id";

        var result = yield nightmare
                .goto(url + token)
                .evaluate(function(userNameEl, userId) {
                    return {
                        uName: document.querySelector(userNameEl).value,
                    }
                }, userNameEl, userId);
            yield nightmare.end();
        assert.isNotNull(result.uName);
    });*/

    //userId长度不符合
    /*it('userId', function*() {
        this.timeout(15000);

        var nightmare = Nightmare();

        var userId = '#user-id',
            testNum = '123123123';

        var result = yield nightmare
                .goto(url + token)
                .type(userId, testNum)
                //.screenshot('./aa22.png')
                .evaluate(function(userId) {
                    return document.querySelector(userId).value;
                }, userId);
            yield nightmare.end();
        assert.equal(result, testNum);
    });*/

    //userId长度符合，且UI表现正确
    /*it('userId has the right style', function*() {
        this.timeout(15000);

        var nightmare = Nightmare();

        var userId = '#user-id',
            testNum = '123456789012345123';

        var result = yield nightmare
                .goto(url + token)
                .type(userId, testNum)
                .click('.person-uid')
                //.screenshot('./uid.png')
                .evaluate(function() {
                    return document.querySelector('.person-uid').classList.contains('error-tips-border');
                });
            yield nightmare.end();
        assert.isNotTrue(result);
    });*/

    //userId不接受字符输入
    /*it('userId can has the string value', function*() {
        this.timeout(15000);

        var nightmare = Nightmare(),
            testString = 'Hello world';

        var result = yield nightmare
                .goto(url + token)
                .type(Dom.userId, testString)
                //.screenshot('./uid-has-no-string.png')
                .evaluate(function(userId) {
                    return document.querySelector(userId).value;
                }, Dom.userId);
                yield nightmare.end();

            assert.equal(result, '');
    });*/

    //城市选择出现
    /*it('city show', function* () {
        this.timeout(15000);

        var nightmare = Nightmare(),
            ele = '.location-city .input-tips';

        var result = yield nightmare
            .goto(url + token)
            //.click('.location-city')  TODO 这里出现点击的时候,会出现图片没加载，city-wrapper组件未出现的情况
            .wait(1000)
            //.screenshot('./city.png')
            .click(ele)
            .wait(1000)
            //.screenshot('./city1.png')
            .evaluate(function() {
                return document.querySelector('.city-wrapper').classList.contains('city-list-box');
            });
            yield nightmare.end();

        assert.isTrue(result);

    });*/


    /*it('.city select', function*() {
        this.timeout(15000);

        var nightmare = Nightmare(),
            ele = '.location-city .input-tips',
            eleOne = '.province-list .list-item:first-child',
            eleTwo = '.city-list .list-item:first-child',
            eleThree = '.area-list .list-item:first-child',
            imgUrl = urlFix('./test-images/city');



        var result = yield nightmare
                .goto(url + token)
                .wait(1000)
                .click(ele)
                .wait(1000)
                .click(eleOne)
                .wait('.city-list .list-item')
                .screenshot(imgUrl('city1.png'))
                .click(eleTwo)
                .wait(1000)
                .wait('.area-list .list-item')
                .screenshot(imgUrl('city2.png'))
                .click(eleThree)
                .wait(1000)
                .screenshot(imgUrl('city3.png'))
                .evaluate(function(ele) {
                    return document.querySelector(ele).innerHTML;
                }, ele)
                yield nightmare.end();
            assert.equal(result, '北京-北京市-东城区');
    });
    */
    /*it('city not select city', function* () {
        this.timeout(30000);

        var nightmare = Nightmare({show: true}),
            ele = '.location-city .input-tips',
            eleOne = '.province-list .list-item:first-child',
            eleTwo = '.city-list .list-item:first-child',
            eleThree = '.area-list .list-item:first-child',
            imgUrl = urlFix('./test-images/city');

        //事件监听函数
        nightmare.on('page', function(type, message) {
            console.log(type, message);
        })

        var result = yield nightmare
                .goto(url + token)
                //.inject('js', './node_modules/nightmare/lib/preload.js')
                .wait(1000)
                .click(ele)
                .wait(1000)
                .click(eleOne)
                //.wait(1000)
                .wait('.city-list .list-item')
                //.screenshot(imgUrl('city1.png'))
                .click(eleTwo)
                .wait(1000)
                .wait('.area-list .list-item')
                //.screenshot(imgUrl('city2.png'))
                .click(eleThree)
                .wait(1000)
                //.screenshot(imgUrl('city3.png'))
                .click(ele)
                .wait(1000)
                .click('.province-list .list-item:nth-child(3)')
                .wait(1000)
                .click('.city-list .list-item:nth-child(2)')
                .wait(1000)
                .click('.area-list .list-item:nth-child(2)')
                .wait(1000)
                .click(ele)
                .wait(1000)
                .click('.province-list .list-item:nth-child(4)')
                .wait(1000)
                .click('.area-list .list-item:nth-child(4)')
                .wait(4000)
                .evaluate(function() {
                    return 123;
                });
                yield nightmare.end();
    });*/

    it.only('upload file', function*() {

        this.timeout(300000);

        var nightmare = Nightmare({show: true}),
            imgUrl = urlFix('./src/images');

        nightmare.on('console', function(type, message) {
            console.log(message);
        });

        var result = yield nightmare
                .goto(url + token)
                .wait(2000)
                .upload('input[name=__x_img]', path.resolve(__dirname, 'src', 'che.jpg'))
                .wait(5000)
                .evaluate(function() {
                    return 123;
                });
            yield nightmare.end();
    });


    it('test upload file', function*() {
        this.timeout(15000);


        var nightmare = new Nightmare({show: true}),
            imgUrl = urlFix('./src/images');

        var result = yield nightmare
                .goto('http://10.94.97.125:8080/static/taxi-driver/src/pages/chuanliu/upload.html')
                .upload('input[type=file]', path.resolve(__dirname, 'src', 'che.jpg'))
                //.click('button[type=submit]')
                .wait(2000)
                .screenshot('./upload.png')
                .evaluate(function() {
                    return 123;
                });
            yield nightmare.end();
    });
});