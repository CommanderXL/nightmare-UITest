/**
 * Created by XRene on 16/9/12.
 */
//reg对象
var reg = {};
reg.time = (function () {
    var configMap = {
            settable_map: {
                timeArr: true,
                containerArr: true,
                startYearArr: true,
                callbackArr: true
            },
            timeArr: [],
            containerArr: [],
            startYearArr: [],
            callbackArr: []
        },
        stateMap = {

        },
        dateNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        generateYear, generateMonth, generateDate,
        initModule, configModule;

    generateYear = function (startYear) {
        var _arr = [],
            i = startYear;
        for(; i <= new Date().getFullYear(); i++) {
            _arr.push({text: i, value: i});
        }
        return _arr;
    };

    generateMonth = function () {
        var _arr = [],
            i = 1;
        for(; i <= 12; i++) {
            _arr.push({text: i, value: i});
        }
        return _arr;
    };

    generateDate = function (year, month) {
        var _isLeapYear = util.isLeapYear(year, month),
            _arr = [],
            _date = dateNum[month - 1],
            i = 1;

        if(_isLeapYear && month === 2) {
            ++_date;
        }

        for(; i <= _date; i++) {
            _arr.push({text: i, value: i});
        }
        return _arr;
    };

    configModule = function (input_map) {
        util.setConfigModule({
            input_map: input_map,
            settable_map: configMap.settable_map,
            config_map: configMap
        })
    };

    initModule = function (container) {
        var startYearArr = configMap.startYearArr,
            timeArr = configMap.timeArr,
            containerArr = configMap.containerArr,
            cbArr = configMap.callbackArr;

        //时间控件初始化
        startYearArr.forEach(function (item, index) {
            var timeObj = timeArr[index] = {};

            //初始化数据
            timeObj.year = generateYear(item);
            timeObj.month = generateMonth();
            timeObj.date = generateDate(item, 1);
            timeObj.selectedYear = item;
            timeObj.selectedMonth = 1;
            //timeObj.selectedDate = null;
        });

        containerArr.forEach(function (ele, index) {
            var timeItem = timeArr[index],
                cb = cbArr[index];
            $(ele).picker({
                data: [timeItem.year, timeItem.month, timeItem.date],
                selectIndex: [0, 0, 0],
                title: '请选择时间'
            }).on('picker.select', function (e, selectVal, selectIndex) {
                var _str = timeItem.year[selectIndex[0]].text + '-' + timeItem.month[selectIndex[1]].text + '-' + timeItem.date[selectIndex[2]].text;
                //回调处理函数
                cb(_str);
            }).on('picker.change', function (e, index, selectIndex) {
                if(index != 2) {
                    index === 0 ? timeItem.selectedYear = timeItem.year[selectIndex].text : timeItem.selectedMonth = timeItem.month[selectIndex].text;
                    $(this).picker('refill', generateDate(timeItem.selectedYear, timeItem.selectedMonth), 2);
                }
            }).on('picker.valuechange', function (e, selectVal, selectIndex) {
                return ;
            });

            //添加事件函数
            $(ele).click(function () {
                $(this).picker('show');
            });
        });
    };

    return {
        initModule: initModule,
        configModule: configModule
    }

})();
