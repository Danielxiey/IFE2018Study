// 邮箱后缀List参考
var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
var emailInput = document.getElementById('email-input');
var emailSug = document.getElementById('email-sug-wrapper');
var nowSel = 0;
emailInput.focus();

//html字符的转义
function htmlEncode(html) {
    var temp = document.createElement('div');
    (temp.textContent != undefined)? (temp.textContent = html) : (temp.innerHTML = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
}

//html字符的反转义
function htmlDecode(text) {
    var temp = document.createElement('div');
    temp.innerHTML = text;
    var output = temp.textContent || temp.innerHTML;
    temp = null;
    return output;
}

function getInput() {
    var text = emailInput.value;
    var tempArray = text.split('');
    var textArray = new Array();
    for(var i = 0; i < tempArray.length; i++) {
        if(tempArray[i] != ' ' && tempArray[i] != '　') {
            textArray.push(tempArray[i]);
        }
    }   
    text = textArray.join('');
    return text;
}

function createTips() {
    var text = getInput();
    var atPos = text.indexOf('@');
    var prefix;
    if(atPos != -1) {
        prefix = text.slice(atPos + 1);
        text = text.slice(0, atPos);
    }
    var liArray = new Array();
    if(atPos != -1) {
        for(var i = 0; i < postfixList.length; i++) {
            if(postfixList[i].indexOf(prefix) != 0) {
                continue;
            }
            var newLi = document.createElement('li');
            newLi.innerHTML = htmlEncode(text + '@' +  postfixList[i]);
            liArray.push(newLi);    //将生成的所有新的li放进一个数组
        }
    }
    
    if(liArray.length == 0) {
        for(var i = 0; i < postfixList.length; i++) {
            var newLi = document.createElement('li');
            newLi.innerHTML = htmlEncode(text + '@' +  postfixList[i]);
            liArray.push(newLi);
        }
    }
    return liArray;
}

function addSug() {
    emailSug.innerHTML = '';
    var liArray = createTips();
    nowSel = 0;
    liArray[nowSel].className = 'active';
    for(var i = 0; i < liArray.length; i++) {
        emailSug.appendChild(liArray[i]);
    }
}

function sugControl() {
    var text = getInput();
    if(text != '') {
        show();
    } else {
        hidden();
    }
}

function show() {
    emailSug.className = 'email-sug';
    emailSug.className += ' show';
}

function hidden() {
    emailSug.className = 'email-sug';
    emailSug.className += ' hidden';
}

emailSug.onclick = function (event) {
    var e = event || window.event;
    var target = e.target;
    if(target.nodeName.toLowerCase() == 'li') {
        console.log(target.innerHTML);
        emailInput.value = htmlDecode(target.innerHTML);
        hidden();
    }
    emailInput.focus();
}

emailInput.onkeyup = function(event) {
    var e = event || window.event;
    var code = e.which || e.keyCode;
    var lis = document.querySelectorAll('.email-sug li');
    var activeLi = lis[nowSel];
    if(code != 38 && code != 40 && code != 13) {
        addSug();
        sugControl();
    }
    if(code == 38) {
        activeLi.className = '';
        if(nowSel != 0) {
            nowSel -= 1;
        } else {
            nowSel = postfixList.length - 1;
        }
        document.querySelectorAll('.email-sug li')[nowSel].className = 'active';
    }
    if(code == 40) {
        activeLi.className = '';
        if(nowSel == postfixList.length - 1) {
            nowSel = 0;
        } else {
            nowSel += 1;
        }
        lis[nowSel].className = 'active';
    }
    if(code == 13) {
        if(emailInput.value != '') {
            emailInput.value = htmlDecode(activeLi.innerHTML);
            hidden();
        }
    }
    if(code == 27) {
        emailInput.select();
    }
}