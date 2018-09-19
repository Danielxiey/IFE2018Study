var queue = ["apple", "pear"];
var newInput = document.getElementById('queue-input');
var inBtn = document.getElementById('in-btn');
var outBtn = document.getElementById('out-btn');
var fontBtn = document.getElementById('font-btn');
var emptyBtn = document.getElementById('empty-btn');
var queueCont = document.getElementById('queue-cont');
var result = document.getElementById('result');

//入队
inBtn.onclick = function() {
    var newItem = newInput.value;
    if(!newItem) {
        return;
    }
    queue.push(newItem);
    queueCont.innerHTML = '队列内容：' +  queue.join('&lt;-');
    newInput.value = '';
    newInput.focus();
}

//出队
outBtn.onclick = function() {
    queue.shift();
    queueCont.innerHTML = '队列内容：' +  queue.join('&lt;-');
}

//打印队头元素内容
fontBtn.onclick = function() {
    if(queue.length == 0) {
        result.innerHTML = '队列为空，无队头元素';
    } else {
        result.innerHTML = '队头元素内容：' + queue[0];
    }
}

//判断队列是否为空
emptyBtn.onclick = function() {
    if(queue.length == 0) {
        result.innerHTML = '队列为空';
    } else {
        result.innerHTML = '队列不为空';
    }
}