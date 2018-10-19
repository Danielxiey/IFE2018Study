function saveData() {
    var data = new Array();
    var trows = document.getElementsByTagName('tr');
    for(var i = 1; i < trows.length; i++) {
        var tempObj = new Object();
        var tempArray = new Array();
        tempObj.product = trows[i].getAttribute('product');
        tempObj.region = trows[i].getAttribute('region');
        var items = trows[i].childNodes;
        for(j = 0; j < 12; j++) {
            tempArray.unshift(items[items.length - 1 - j].innerHTML);
        }
        tempObj.sale = tempArray;
        data.push(tempObj);
    }
    localStorage.setItem('saveData', JSON.stringify(data));
}