var radioA = document.getElementById('radio-a');
var radioB = document.getElementById('radio-b');
var stringA = document.getElementById('str-a');
var stringB = document.getElementById('str-b');
var numberA = document.getElementById('num-a');
var numberB = document.getElementById('num-b');
var result = document.getElementById('result');
var btnGroup = document.querySelector('.btnGroup');

//事件委托给所有button的父元素
btnGroup.addEventListener('click', function(event) {    
    var selectText = null, unselectText = null;
    var e = event || window.event;
    var target = e.target;            //获取实际的事件对象
    var stringAText = stringA.value;
    var stringBText = stringB.value;
    var numA = Number(numberA.value);
    var numB = Number(numberB.value);

    if(radioA.checked === true) {     //检测第一个单选框是否被选中   
        selectText = stringAText;     //checked的属性值是布尔值，不是字符串，需要注意
        unselectText = stringBText;
    }
    if(radioB.checked === true) {     //检测第二个单选框是否被选中   
        selectText = stringBText;
        unselectText = stringAText;
    }

    switch(target.className) {
        case 'length':      //获取当前选中输入的内容长度
            result.innerHTML = selectText.length;
            break;
        case 'position3':   //当前选中输入中的第3个字符
            result.innerHTML = selectText[2];
            break;
        case 'concat':      //把两个输入框的文字连接在一起输出（concat）
            result.innerHTML = stringAText + stringBText;
            break;
        case 'indexof':     //输入B中的内容，在输入A的内容中第一次出现的位置（indexOf）
            result.innerHTML = stringAText.indexOf(stringBText);
            break;
        case 'lastindexof': //输入A中的内容，在输入B的内容中最后一次出现的位置（lastIndexOf）
            result.innerHTML = stringBText.lastIndexOf(stringAText);
            break;
        case 'slice':       //使用slice获取选中输入框内容的部分内容，参数为num-a及num-b
            result.innerHTML = selectText.slice(numA, numB);
            break;
        case 'wrap':        //当前选中输入框的行数
            result.innerHTML = searchWrap(selectText);
            break;
        case 'substr':      //使用substr获取选中输入框内容的子字符串，参数为num-a及num-b
            result.innerHTML = selectText.substr(numA, numB);
            break;
        case 'uppercase':   //把所选输入框中的内容全部转为大写
            result.innerHTML = selectText.toUpperCase();
            break;
        case 'lowercase':   //把所选输入框中的内容全部转为小写
            result.innerHTML = selectText.toLowerCase();
            break;
        case 'clear':       //把所选输入框中内容的半角空格全部去除
            result.innerHTML = clearSpace(selectText);
            break;
        case 'replace':     //把所选输入框中内容的a全部替换成另外一个输入框中的内容
            result.innerHTML = selectText.replace(/a/g, unselectText);
            break;
    }
});

//检索换行符，并统计
function searchWrap(string) {
    var count = 0;      //初始化计数值
    for(var i = 0; i < string.length; i++) {
        if(string[i] === '\n') {
            count++;    //检索到换行符，计数值加1
        }
    }
    return count + 1;   //行数总是比换行符多1
}

//去除半角空格
function clearSpace(string) {
    var textArray = new Array();            //定义一个数组
    for(var i = 0; i < string.length; i++) {
        if(string.charCodeAt(i) !== 32) {   //判断当前字符是否为半角空格，半角空格Unicode：32，全角空格Unicode：12288
            textArray.push(string[i]);      //若不是半角空格则将字符压入数组
        }
    }
    return textArray.join('');              //join方法将数组中的元素组合为一个字符串并返回
}