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

//保存数据到localStorage
saveBtn.onclick = saveData;

// localStorage.clear();