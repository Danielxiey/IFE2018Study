//补全html元素
//添加option的函数
function addOption(start, end, parentNode) { //option的起始值、结束值，以及要添加的父元素
    for(var i = start; i <= end; i++) {
        var newOption = document.createElement('option');
        newOption.value = i;
        newOption.innerHTML = i;
        parentNode.appendChild(newOption);
    }
}

var yearSel = document.getElementById('year-select');
addOption(2000, 2032, yearSel);     //给年份选择添加option

var monthSel = document.getElementById('month-select');
addOption(1, 12, monthSel);         //给月份选择添加option

var daySel = document.getElementById('day-select');
addOption(1, 31, daySel);           //给日期选择添加option

//不同年份，不同月份，天数做相应的变化
function monthdays() {
    var year = yearSel.value;
    switch(monthSel.value) {
        case '1':
        case '3':
        case '5':
        case '7':
        case '8':
        case '10':
        case '12':
            daySel.innerHTML = '';
            addOption(1, 31, daySel);
            break;
        case '4':
        case '6':
        case '9':
        case '11':
            daySel.innerHTML = '';
            addOption(1, 30, daySel);
            break;
        case '2':
            daySel.innerHTML = '';
            if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                addOption(1, 29, daySel);
            } else {
                addOption(1, 28, daySel);
            }
    }
}

monthSel.onchange = monthdays;  //月份改变时更新天数
yearSel.onchange = monthdays;   //年份改变时更新天数

var hourSel = document.getElementById('hour-select');
addOption(0, 23, hourSel);      //给小时数添加option

var minuteSel  = document.getElementById('minute-select');
addOption(0, 59, minuteSel);    //给分钟数添加option

var secondSel = document.getElementById('second-select');
addOption(0, 59, secondSel);    //给秒数添加option


//功能编写
var selects = document.getElementById('selects');
var result = document.getElementById('result-wrapper');

//显示result中的内容
function showTime() {
    var year = yearSel.value;
    var month = monthSel.value;
    var day = daySel.value;
    var hour = checkTime(hourSel.value);
    var minute = checkTime(minuteSel.value);
    var second = checkTime(secondSel.value);
    var tempMonth = month - 1;
    var tempDate = new Date(+year, +tempMonth, +day, +hour, +minute, +second);
    var date = dayTime(tempDate.getDay());
    var nowTime = new Date();
    var past;
    if(nowTime.getTime() > tempDate.getTime()) {
        past = pastTime(nowTime.getTime(), tempDate.getTime());
        result.innerHTML = '现在距离' + ' ' + year + '年' + month + '月' + day + '日' + date + ' ' + hour + ':' + minute + ':' + second + ' 已经过去 ' + past;
    } else {
        past = pastTime(nowTime.getTime(), tempDate.getTime());
        result.innerHTML = '现在距离' + ' ' + year + '年' + month + '月' + day + '日' + date + ' ' + hour + ':' + minute + ':' + second + ' 还有 ' + past;
    }
}

//获取中文的星期表示
function dayTime(n) {
    var days = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    return days[n];
}

//检查时间是否需要补0
function checkTime(n) {
    if(n < 10) {
        n = '0' + n;
    }
    return n;
}

//计算此刻时间与设置时间的差值，并进行单位换算
function pastTime(nowTime, setTime) {
    var time = Math.abs(nowTime - setTime) / 1000;
    var day = Math.floor(time / 86400);
    var hour = Math.floor(time % 86400 / 3600);
    var minute = Math.floor(time % 3600 / 60);
    var second = Math.floor(time % 60);
    var past = day + '天' + hour + '小时' + minute + '分' + second + '秒';
    return past;
}

//通过事件委托，将所有select的onchange事件绑定在它们的父元素上
selects.onchange = showTime;

//初始化result结果
showTime();