var radioA = document.getElementById('radio-a');
var radioB = document.getElementById('radio-b');
var inputA = document.getElementById('num-a');
var inputB = document.getElementById('num-b');
var result = document.getElementById('result');
var btnGroup = document.querySelector('.btnGroup');

function numJudge(valueA, valueB) {
    if(isNaN(valueA) || isNaN(valueB)) {
        result.innerHTML = 'input error';
        return true;
    } else {
        return false;
    }
}

//事件委托给所有button的父元素
btnGroup.addEventListener('click', function(event) {      
    var inputNum;
    var e = event || window.event;      
    var target = e.target;              //获取实际的事件对象
    var valueA = +inputA.value;         //+操作符将字符串转换为数字
    var valueB = +inputB.value;
    if(radioA.checked === true) {     //检测第一个单选框是否被选中
        inputNum = valueA;            //checked的属性值是布尔值，不是字符串，需要注意
    }
    if(radioB.checked === true) {     //检测第二个单选框是否被选中
        inputNum = valueB;
    }
    switch(target.className) {
        case 'judge':   //判断当前选中的输入框输入内容是否为数字
            result.innerHTML = isNaN(inputNum)? 'Not a number' : 'Yes, It is a number';
            break;
        case 'fixed':   //把 A 四舍五入为 B 个小数位数的数字
            if(numJudge(valueA, valueB)) break;
            if(Math.floor(valueB) != valueB) {result.innerHTML = 'error：数字B要为整数'; break;}
            result.innerHTML = valueA.toFixed(valueB);
            break;
        case 'abs':     //当前选中数字的绝对值
            if(isNaN(inputNum)) {result.innerHTML = 'input error'; break;}
            result.innerHTML = Math.abs(inputNum); 
            break;  
        case 'ceil':    //对当前选中的数字进行上舍入
            if(isNaN(inputNum)) {result.innerHTML = 'input error'; break;}
            result.innerHTML = Math.ceil(inputNum); 
            break;
        case 'floor':   //对当前选中的数字进行下舍入
            if(isNaN(inputNum)) {result.innerHTML = 'input error'; break;}
            result.innerHTML = Math.floor(inputNum); 
            break;
        case 'round':   //把当前选中的数字四舍五入为最接近的整数
            if(isNaN(inputNum)) {result.innerHTML = 'input error'; break;}
            result.innerHTML = Math.round(inputNum); 
            break;
        case 'max':     //返回 A 和 B 中的最高值
            if(numJudge(valueA, valueB)) break;
            result.innerHTML = Math.max(valueA, valueB);
            break;
        case 'min':     //返回 A 和 B 中的最低值
            if(numJudge(valueA, valueB)) break;
            result.innerHTML = Math.min(valueA, valueB);
            break;
    }
});