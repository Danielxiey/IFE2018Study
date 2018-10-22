// 记录产品的选择以及地域的选择
function saveState() {
    var trows = document.getElementsByTagName('tr');
    var hashArray = new Array();
    for(var i = 1; i < trows.length; i++) {
        var product = trows[i].getAttribute('product');
        var region = trows[i].getAttribute('region');
        hashArray.push(product + '-' + region);
    }
    history.pushState(null,null,'#' + hashArray.join('&'));
}

// 解析保存在hash中的信息
function analysisState() {
    var state = location.hash.slice(1);
    var stateArray = state.split('&');
    var infoArray = new Array();
    for(var i = 0; i < stateArray.length; i++) {
        var item = decodeURI(stateArray[i]);
        var itemArray = item.split('-');
        infoArray.push(itemArray);
    }
    return infoArray;
}

// 根据解析的信息将复选框进行勾选
function checkbox() {
    var products = document.querySelectorAll('#product-checkbox-wrapper .single');
    var regions = document.querySelectorAll('#region-checkbox-wrapper .single');
    var productAll = document.querySelector('#product-checkbox-wrapper [check-type="all"]');
    var regionAll = document.querySelector('#region-checkbox-wrapper [check-type="all"]');
    var productNum = 0, regionNum = 0;
    var infoArray = analysisState();
    //  初始化，将所有的勾选项取消勾选
    for(var p = 0; p < products.length; p++) {
        products[p].checked = false;                           
        products[p].setAttribute('checked', 'false');
    }
    for(var q = 0; q < regions.length; q++) {
        regions[q].checked = false;                           
        regions[q].setAttribute('checked', 'false');
    }
    productAll.checked = false;
    productAll.setAttribute('checked', 'false');
    regionAll.checked = false;
    regionAll.setAttribute('checked', 'false');

    //根据解析的信息对复选框进行勾选
    for(var i = 0; i < infoArray.length; i++) {
        for(var j = 0; j < products.length; j++) {
            if(infoArray[i][0] == products[j].value) {
                products[j].checked = true;                           
                products[j].setAttribute('checked', 'true');
            }
        }
        for(var k = 0; k < regions.length; k++) {
            if(infoArray[i][1] == regions[k].value) {
                regions[k].checked = true;                           
                regions[k].setAttribute('checked', 'true');
            }
        }
    }
    for(var p = 0; p < products.length; p++) {
        if(products[p].getAttribute('checked') == 'true') {
            productNum++;
        }
    }
    for(var q = 0; q < regions.length; q++) {
        if(regions[q].getAttribute('checked') == 'true') {
            regionNum++;
        }
    }
    if(productNum == 3) {
        productAll.checked = true;                           
        productAll.setAttribute('checked', 'true');
    }
    if(regionNum == 3) {
        regionAll.checked = true;                           
        regionAll.setAttribute('checked', 'true');
    }
}

// 渲染记录的页面状态
function render() {
    checkbox();
    var targetData = getCheckdata();
    drawCheckboxTable(targetData);
    drawLines(targetData);
}