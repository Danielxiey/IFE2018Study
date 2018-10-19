var tableWrap = document.getElementById('table-wrapper');
var tcellValue = 0;
var tableEdit = 0;

// 当鼠标滑过任何一行时，把这一行的数据在两个图表中进行呈现
tableWrap.addEventListener('mouseover', function(event) {
    var e = event || window.event;
    var target = e.target;
    var dataArray = new Array();    
    if(target.nodeName.toLowerCase() == 'td') {
        var items = target.parentNode.childNodes;
        for(var i = 0; i < 12; i++) {
            dataArray.unshift(Number(items[items.length - 1 - i].innerHTML));
        }
    }
    var ctx = line.getContext('2d');
    ctx.clearRect(0,0,600,380);
    bar.innerHTML = '';
    drawBar(dataArray);
    drawLine(dataArray);
});

// 当鼠标滑动过某一个数字的单元格时，数字旁边显示一个铅笔的icon
tableWrap.addEventListener('mouseover', function(event) {
    var e = event || window.event;
    var target = e.target;
    if(target.nodeName.toLowerCase() == 'td' && !isNaN(target.innerHTML)) {
        target.style.background = "url('images/edit.png') right center no-repeat";
    }
});
// 鼠标移出单元格时，铅笔的icon消失
tableWrap.addEventListener('mouseout', function(event) {
    var e = event || window.event;
    var target = e.target;
    if(target.nodeName.toLowerCase() == 'td' && !isNaN(target.innerHTML)) {
        target.style.background = '';
    }
})

// 单元格进入编辑状态
tableWrap.addEventListener('click', function(event) {
    var e = event || window.event;
    var target = e.target;
    if(tableEdit == 0) {
        if(target.nodeName.toLowerCase() == 'td' && !isNaN(target.innerHTML)) {
            target.style.background = '';
            var input = document.createElement('input');
            input.value = tcellValue = target.innerHTML;
            target.innerHTML = '';
            target.appendChild(input);
            input.focus();
            var confirm = document.createElement('button');
            confirm.setAttribute('class', 'confirm');
            confirm.innerHTML = '确定';
            var cancel = document.createElement('button');
            cancel.setAttribute('class', 'cancel');
            cancel.innerHTML = '取消';
            target.appendChild(confirm);
            target.appendChild(cancel);
            tableEdit = 1;
    
            input.onkeyup = function(event) {
                var e = event || window.event;
                var code = e.which || e.keyCode;
                if(code == 13) {
                    var newValue = input.value;
                    if(isNaN(newValue)) {
                        alert('Error,your input is not a number');
                    } else {
                        tcellValue = newValue;
                    }
                    input.parentNode.innerHTML = tcellValue;
                    tableEdit = 0;
                }
                if(code == 27) {
                    input.parentNode.innerHTML = tcellValue;
                    tableEdit = 0;
                }
            }
        }
    } else {
        if(target.nodeName.toLowerCase() != 'input' && target.nodeName.toLowerCase() != 'button') {
            var targetinput = document.querySelector('#table-wrapper input');
            targetinput.parentNode.innerHTML = tcellValue;
            tableEdit = 0;
        }
    }
    
});

//单元格编辑函数
tableWrap.addEventListener('click', function(event) {
    var e = event || window.event;
    var target = e.target;
    if(target.nodeName.toLowerCase() == 'button') {
        if(target.innerHTML == '确定') {
            var newValue = target.parentNode.firstChild.value;
            if(isNaN(newValue)) {
                alert('Error,your input is not a number');
            } else {
                tcellValue = newValue;
            }
        }
        target.parentNode.innerHTML = tcellValue;
        tableEdit = 0;
    }
});