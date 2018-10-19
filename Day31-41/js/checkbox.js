//根据checkbox选项获取数据并绘制表格
//多选框功能函数
function checkboxFunc(event) {      //采用事件委托
    var e = event || window.event;
    var target = e.target;  
    var inputs = target.parentNode.querySelectorAll('.single');         //获取除全选外的复选框  
    var selAll = target.parentNode.querySelector('[check-type="all"]'); //获取全选框
    if(target.nodeName.toLowerCase() == 'input') {                      //判断点击的是否是input元素
        if(target.getAttribute('check-type') == 'all') {                //判断点击的是否是全选框
            if(target.getAttribute('checked') == 'true') {              //判断全选框是否已勾选
                e.preventDefault();                                     //若是，阻止点击的默认行为
            } else {
                selAll.setAttribute('checked', 'true');                 //若不是则勾选全选框
                for(var i = 0; i < inputs.length; i++) {
                    inputs[i].checked = true;                           //将其他复选框全部勾选
                    inputs[i].setAttribute('checked', 'true');
                }
            }
        } else {
            var count = 0;                                              //记录已勾选的复选框数量
            for(var i = 0; i < inputs.length; i++) {
                if(inputs[i].getAttribute('checked') == 'true') {
                    count++;
                }
            }
            if(target.getAttribute('checked') == 'true') {              //判断当前的复选框是否已勾选
                if(count == 1) {                                        //如果该复选框时唯一勾选的
                     e.preventDefault();                                //则阻止点击的默认行为
                     return;
                }
                if(count == inputs.length) {                            //若已勾选的复选框数量等于所有复选框的数量
                    selAll.checked = false;
                    selAll.setAttribute('checked', 'false');            //将全选框取消勾选
                }
                target.setAttribute('checked', 'false');                //将该复选框取消勾选
            } else {                                                    
                target.setAttribute('checked', 'true');                 //当前的复选框未勾选
                if(count == inputs.length - 1) {                        //判断除了该复选框，其它复选框是否都已勾选
                    selAll.checked = true;                              //勾选当前的复选框
                    selAll.setAttribute('checked', 'true');             //全选框勾选
                }
            }
        }
    }
}

//获取复选框组的数据
function checkboxSel(all,singles) {
    var dataArray = new Array();
    if(all.getAttribute('checked') == 'true') {     //判断全选框是否已勾选
        for(var i = 0; i < singles.length; i++) {
            dataArray.push(singles[i].value);       //将每个复选框的值放入数组
        }
    } else {
        for(var i = 0; i < singles.length; i++) {
            if(singles[i].getAttribute('checked') == 'true') {
                dataArray.push(singles[i].value);   //将勾选的复选框的值放入数组
            }
        }
    }
    return dataArray;                               //返回复选框组的数据
}

//根据复选框组的数据从SourceData获取数据
function getCheckdata() {
    var regionInputs = regionCheckbox.querySelectorAll('.single');
    var regionAll = regionCheckbox.querySelector('[check-type="all"]');
    var productInputs = productCheckbox.querySelectorAll('.single');
    var productAll = productCheckbox.querySelector('[check-type="all"]');
    var regionData = checkboxSel(regionAll, regionInputs);
    var productData = checkboxSel(productAll, productInputs);
    var targetDate = new Array();

    for(var i = 0; i < regionData.length; i++) {
        for(j = 0; j < productData.length; j++) {
            for(k = 0; k < sourceData.length; k++) {
                if(regionData[i] == sourceData[k].region && productData[j] == sourceData[k].product) {
                    targetDate.push(sourceData[k]);
                }       //匹配sourceData中每个成员的区域值和商品种类值是否匹配，若匹配则放入targetData
            }
        }
    }
    return targetDate;  //返回匹配的sourceData中的数据
}

//根据checkbox选项获取数据并绘制表格
function drawCheckboxTable(targetData) {
    var regionInputs = regionCheckbox.querySelectorAll('.single');
    var regionAll = regionCheckbox.querySelector('[check-type="all"]');
    var productInputs = productCheckbox.querySelectorAll('.single');
    var productAll = productCheckbox.querySelector('[check-type="all"]');
    var region = checkboxSel(regionAll, regionInputs);      //获取复选框的区域数据
    var product = checkboxSel(productAll, productInputs);   //获取复选框的商品种类数据
    var regionNum = region.length;                          //选择的区域数量
    var productNum = product.length;                        //选择的商品种类数量
    var tableBody;

    if(productNum > 0 && regionNum > 0) {                   //选择了多个商品种类，多个区域
        if(productNum > 1 && regionNum == 1) {
            tableWrap.innerHTML = "<tr><th>地区</th><th>商品</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr>";
            tableBody = document.querySelector('#table-wrapper tbody');
            for(var i = 0; i < targetData.length; i++) {
                var trow = document.createElement('tr');
                tableBody.appendChild(trow);
                var cols = (i == 0)? 14 : 13;
                for(var j = 0; j < cols; j++) {
                    var tcell = document.createElement('td');
                    trow.appendChild(tcell);
                }
                trow.setAttribute('product', targetData[i].product);
                trow.setAttribute('region', targetData[i].region);
                var k = 0;
                if(cols == 14) {
                    trow.childNodes[0].textContent = targetData[i].region;
                    trow.childNodes[0].setAttribute('rowspan', productNum);
                    trow.childNodes[1].textContent = targetData[i].product;
                    k += 2;
                } else {
                    trow.childNodes[0].textContent = targetData[i].product;
                    k++;
                }
                for(;k < cols; k++) {
                    trow.childNodes[k].textContent = targetData[i].sale[12 - (cols - k)];
                }
            }
        } else {
            tableWrap.innerHTML = "<tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr>";
            tableBody = document.querySelector('#table-wrapper tbody');
            if(productNum == 1 && regionNum > 1) {          //选择了一个商品种类，多个区域
                for(var i = 0; i < targetData.length; i++) {
                    var trow = document.createElement('tr');
                    tableBody.appendChild(trow);           
                    var cols = (i == 0)? 14 : 13;           //是否是该商品种类的第一行，若是有14个单元格，否则有13个单元格
                    for(var j = 0; j < cols; j++) {         //添加单元格
                        var tcell = document.createElement('td');
                        trow.appendChild(tcell);
                    }
                    trow.setAttribute('product', targetData[i].product);
                    trow.setAttribute('region', targetData[i].region);
                    var k = 0;                              //定义k来指示当前行的所在的单元格位置
                    if(cols == 14) {                        //若是商品种类的第一行（14个单元格）
                        trow.childNodes[0].textContent = targetData[i].product;     //设置商品种类
                        trow.childNodes[0].setAttribute('rowspan', regionNum);      //设置跨行
                        trow.childNodes[1].textContent = targetData[i].region;      //设置区域
                        k += 2;                                                     //移动指示单元格的位置
                    } else {                                //不是商品种类的第一行（13个单元格）
                        trow.childNodes[0].textContent = targetData[i].region;      //设置区域
                        k++;
                    }
                    for(;k < cols; k++) {                                           //添加单元格中的月份销售数据                               
                        trow.childNodes[k].textContent = targetData[i].sale[12 - (cols - k)];
                    }
                }
            } else if(productNum > 1 && regionNum > 1) {    //选择了多个商品种类，多个区域
                for(var m = 0; m < product.length; m++) {
                    var dataFlag = 1;                       //设置了当前是否是该商品种类第一行数据的标志，1为是，0为否
                    var tempRows = new Array();             //存放每一组商品种类的信息的临时数组
                    for(i = 0; i < targetData.length; i++) {
                        if(targetData[i].product == product[m]) {
                            var trow = document.createElement('tr');
                            tempRows.push(trow);
                            var cols = (dataFlag == 1)? 14 : 13;
                            for(var j = 0; j < cols; j++) {
                                var tcell = document.createElement('td');
                                trow.appendChild(tcell);
                            }
                            trow.setAttribute('product', targetData[i].product);
                            trow.setAttribute('region', targetData[i].region);
                            var k = 0;
                            if(cols == 14) {
                                trow.childNodes[0].textContent = targetData[i].product;
                                trow.childNodes[1].textContent = targetData[i].region;
                                k += 2;
                            } else {
                                trow.childNodes[0].textContent = targetData[i].region;
                                k++;
                            }
                            for(;k < cols; k++) {
                                trow.childNodes[k].textContent = targetData[i].sale[12 - (cols - k)];
                            }
                            dataFlag = 0;                   //设置标志
                        }
                    }
                    for(var n = 0; n < tempRows.length; n++) {      //将临时数据中的表格行添加到table中
                        if(n == 0) {        //给每一组商品种类的信息行的第一行设置rowspan属性
                            tempRows[n].childNodes[0].setAttribute('rowspan', tempRows.length);
                        }
                        tableBody.appendChild(tempRows[n]);
                    }
                }
            } else if(productNum == 1 && regionNum == 1) {  //选择了一个商品种类，一个区域
                for(var i = 0; i < targetData.length; i++) {
                    var trow = document.createElement('tr');
                    tableBody.appendChild(trow);
                    for(var j = 0; j < 14; j++) {           //每一行都是14个单元格
                        var tcell = document.createElement('td');
                        trow.appendChild(tcell);
                    }
                    trow.setAttribute('product', targetData[i].product);
                    trow.setAttribute('region', targetData[i].region);
                    trow.childNodes[0].textContent = targetData[i].product;
                    trow.childNodes[1].textContent = targetData[i].region;
                    for(k = 2;k < 14; k++) {
                        trow.childNodes[k].textContent = targetData[i].sale[k - 2];
                    }
                }
            }
        }
    }
}