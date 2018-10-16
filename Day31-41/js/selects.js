//根据select选项获取数据并绘制表格
//根据select选项获取数据
function getSeldata() {
    var region = regionSel.value;
    var product = productSel.value;
    var targetData = new Array();
    for(var i = 0; i < sourceData.length; i++) {
        if(sourceData[i].region == region && product == '') {   //区域匹配，商品种类为空
            targetData.push(sourceData[i]);     
        } else if(region == '' && sourceData[i].product == product) {   //商品种类匹配，区域为空
            targetData.push(sourceData[i]);
        } else if(sourceData[i].region == region && sourceData[i].product == product) { //区域匹配，商品种类匹配
            targetData.push(sourceData[i]);
        }
    }
    return targetData;  //返回匹配的数据
}

//根据获取的数据绘制表格
function drawSeltable(targetData) {
    if(targetData.length == 0) {    //若匹配的数据为空，则不显示表格，退出函数
        tableWrap.innerHTML = '';
        return;
    }   //初始化表格表头
    tableWrap.innerHTML = "<tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr>";
    var tableBody = document.querySelector('#table-wrapper tbody');
    for(var i = 0; i < targetData.length; i++) {
        var trow = document.createElement('tr');                    //创建表格新一行
        tableBody.appendChild(trow);                                //将新行添加到表格中
        for(var j = 0; j < 14; j++) {                               //每行有14个单元格
            var tcell = document.createElement('td');               //创建表格单元
            trow.appendChild(tcell);                                //将表格单元添加到新行
        }
        trow.childNodes[0].textContent = targetData[i].product;     //设置单元格的值
        trow.childNodes[1].textContent = targetData[i].region;
        for(var k = 0; k < 12; k++) {   
            trow.childNodes[k + 2].textContent = targetData[i].sale[k];
        }
    }
}