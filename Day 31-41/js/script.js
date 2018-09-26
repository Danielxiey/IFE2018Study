//Day 31 task1 & task2
var selects = document.getElementById('selects');
var regionSel = document.getElementById('region-select');
var productSel = document.getElementById('product-select');
var tableWrap = document.getElementById('table-wrapper');

selects.onchange = function() {
    var targetData = getSeldata();
    drawSeltable(targetData);
}

function getSeldata() {
    var region = regionSel.value;
    var product = productSel.value;
    var targetData = new Array();
    for(var i = 0; i < sourceData.length; i++) {
        if(sourceData[i].region == region && product == '') {
            targetData.push(sourceData[i]);
        } else if(region == '' && sourceData[i].product == product) {
            targetData.push(sourceData[i]);
        } else if(sourceData[i].region == region && sourceData[i].product == product) {
            targetData.push(sourceData[i]);
        }
    }
    return targetData;
}

function drawSeltable(targetData) {
    if(targetData.length == 0) {
        tableWrap.innerHTML = '';
        return;
    }
    tableWrap.innerHTML = "<tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr>";
    tableBody = document.querySelector('#table-wrapper tbody');
    for(var i = 0; i < targetData.length; i++) {
        var trow = document.createElement('tr');
        tableBody.appendChild(trow);
        for(var j = 0; j < 14; j++) {
            var tcell = document.createElement('td');
            trow.appendChild(tcell);
        }
        trow.childNodes[0].textContent = targetData[i].product;
        trow.childNodes[1].textContent = targetData[i].region;
        for(var k = 0; k < 12; k++) {
            trow.childNodes[k + 2].textContent = targetData[i].sale[k];
        }
    }
}


//Day31 task3 & task4
var regionCheckbox = document.getElementById('region-checkbox-wrapper');
var productCheckbox = document.getElementById('product-checkbox-wrapper');

function checkboxFunc(event) {
    var e = event || window.event;
    var target = e.target;
    var inputs = target.parentNode.querySelectorAll('.single');
    var selAll = target.parentNode.querySelector('[check-type="all"]');
    if(target.nodeName.toLowerCase() == 'input') {
        if(target.getAttribute('check-type') == 'all') {
            if(target.getAttribute('checked') == 'true') {
                e.preventDefault();
            } else {
                selAll.setAttribute('checked', 'true');
                for(var i = 0; i < inputs.length; i++) {
                    inputs[i].checked = true;
                    inputs[i].setAttribute('checked', 'true');
                }
            }
        } else {
            var count = 0;
            for(var i = 0; i < inputs.length; i++) {
                if(inputs[i].getAttribute('checked') == 'true') {
                    count++;
                }
            }
            if(target.getAttribute('checked') == 'true') {
                if(count == 1) {
                     e.preventDefault();
                     return;
                }
                if(count == inputs.length) {
                    selAll.checked = false;
                    selAll.setAttribute('checked', 'false');
                }
                target.setAttribute('checked', 'false');
            } else {
                target.setAttribute('checked', 'true');
                if(count == inputs.length - 1) {
                    selAll.checked = true;
                    selAll.setAttribute('checked', 'true');
                }
            }
        }
    }
}

function checkboxSel(all,singles) {
    var dataArray = new Array();
    if(all.getAttribute('checked') == 'true') {
        for(var i = 0; i < singles.length; i++) {
            dataArray.push(singles[i].value);
        }
    } else {
        for(var i = 0; i < singles.length; i++) {
            if(singles[i].getAttribute('checked') == 'true') {
                dataArray.push(singles[i].value);
            }
        }
    }
    return dataArray;
}

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
                }
            }
        }
    }
    return targetDate;
}

regionCheckbox.addEventListener('click', checkboxFunc);
regionCheckbox.addEventListener('click', getCheckdata);
productCheckbox.addEventListener('click', checkboxFunc);
productCheckbox.addEventListener('click', getCheckdata);