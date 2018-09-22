var show1 = document.getElementById('show1');
var show2 = document.getElementById('show2');

function showDate() {
    var d = new Date();
    var year = d.getFullYear();
    var month = checkTime(d.getMonth() + 1);
    var date = checkTime(d.getDate()); 
    var day = d.getDay();
    var hours = d.getHours();
    var minutes = checkTime(d.getMinutes());
    var seconds = checkTime(d.getSeconds());
    show1.innerHTML = gatherTime1(year, month, date, day, hours ,minutes, seconds);
    show2.innerHTML = gatherTime2(year, month, date, day, hours ,minutes, seconds);
    timer = setTimeout('showDate()', 500);
}

function dayTime(n, lang) {
    var days1 = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    var days2 = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    if(lang == 'zh') {
        return days1[n];
    }
    if (lang == 'en') {
        return days2[n];
    }
}

function checkTime(n) {
    if(n < 10) {
        n = '0' + n;
    }
    return n;
}

function gatherTime1(year, month, date, day, hours ,minutes, seconds) {
    day = dayTime(day ,'zh');
    hours = checkTime(hours);
    var time = year + '年' + month + '月' + date + '日' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    return time;
}

function gatherTime2(year, month, date, day, hours ,minutes, seconds) {
    day = dayTime(day, 'en');
    var ampm = (hours <= 12)? 'Am' : 'Pm';
    if(hours <= 12) {
        hours = checkTime(hours);
    } else {
        hours = checkTime(hours % 12);
    }
    var time = year + '-' + month + '-' + date + ' ' + day + ' ' + hours + ':' + minutes + ':' + seconds + ' ' +  ampm;
    return time;
}

showDate();