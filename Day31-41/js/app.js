var selects = document.getElementById('selects');
var regionSel = document.getElementById('region-select');
var productSel = document.getElementById('product-select');
var checkboxes = document.getElementById('checkboxes');
var regionCheckbox = document.getElementById('region-checkbox-wrapper');
var productCheckbox = document.getElementById('product-checkbox-wrapper');
var tableWrap = document.getElementById('table-wrapper');
var bar = document.getElementById('mainbar');
var line = document.getElementById('line');
var saveBtn = document.getElementById('savedata');

//根据select选项获取数据并绘制表格
selects.onchange = function() {
    var targetData = getSeldata();
    drawSeltable(targetData);
    drawLines(targetData);
}

//给复选框绑定相关逻辑函数
regionCheckbox.addEventListener('click', checkboxFunc);
productCheckbox.addEventListener('click', checkboxFunc);

//根据checkbox选项获取数据并绘制表格
checkboxes.onclick = function() {
    var targetData = getCheckdata();
    drawCheckboxTable(targetData);
    drawLines(targetData);
}

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

//保存数据到localStorage
saveBtn.onclick = saveData;

// 测试清除缓存用
// localStorage.clear();