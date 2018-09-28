//根据select选项获取数据并绘制表格
selects.onchange = function() {
    var targetData = getSeldata();
    drawSeltable(targetData);
}

//给复选框绑定相关逻辑函数
regionCheckbox.addEventListener('click', checkboxFunc);
productCheckbox.addEventListener('click', checkboxFunc);

//根据checkbox选项获取数据并绘制表格
checkboxes.onclick = function() {
    var targetData = getCheckdata();
    drawCheckboxTable(targetData);
}