var stack = ["apple", "pear"];
var newInput = document.getElementById('stack-input');
var pushBtn = document.getElementById('push-btn');
var popBtn = document.getElementById('pop-btn');
var fontBtn = document.getElementById('font-btn');
var emptyBtn = document.getElementById('empty-btn');
var stackCont = document.getElementById('stack-cont');
var result = document.getElementById('result');

//进栈
pushBtn.onclick = function() {
    var newItem = newInput.value;
    if(!newItem) {
        return;
    }
    stack.unshift(newItem);
    stackCont.innerHTML = '栈内容：' + stack.join('&lt;-');
    newInput.value = '';
    newInput.focus();
}

//退栈
popBtn.onclick = function() {
    stack.shift();
    stackCont.innerHTML = '栈内容：' + stack.join('&lt;-'); 
}

//打印栈顶元素内容
fontBtn.onclick = function() {
    if(stack.length == 0) {
        result.innerHTML = '栈为空，无栈顶元素';
    } else {
        result.innerHTML = '栈顶元素内容：' + stack[0];
    }
}

//判断栈是否为空
emptyBtn.onclick = function() {
    if(stack.length == 0) {
        result.innerHTML = '栈为空';
    } else {
        result.innerHTML = '栈不为空';
    }
}