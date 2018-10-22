//绘制条形图
function drawBar(data,barcolor,width,ratio,offset) {
    var mainbar = document.getElementById('mainbar');
    var xaxis = "<line x1='20' y1='342' x2='540' y2='342' style='fill:black;stroke:black;stroke-width:2' />"
    var yaxis = "<line x1='20' y1='20' x2='20' y2='342' style='fill:black;stroke:black;stroke-width:2' />"
    
    // 未填入参数时的参数初始化
    if(!barcolor) {
        barcolor = '#F2635E';
    }
    if(!width) {
        width = 30;
    }
    if(!ratio) {
        var maxdata =  data[0];
        for(var i = 0; i < data.length; i++) {
            if(data[i] > maxdata) {
                maxdata = data[i];
            }
        }
        var proportion = maxdata / 304;
    } else {
        proportion = ratio;
        maxdata = Math.floor(proportion * 304);
    }
    if(!offset) {
        offset = 0;
    }
    offset = 36 + offset * width;
    
    var gap = 12;
    for(var i = 0; i < data.length; i++) {
        var x = offset + i * (30 + gap);
        var y = 342 - data[i] / proportion;
        var height = data[i] / proportion;
        var bar = "<rect x='" + x + "' y='" + y + "' width='" + width + "' height='" + height + "' style='fill:" + barcolor + "' />"
        mainbar.innerHTML += bar;
    }

    // 绘制最大值坐标点
    var text = "<text x='0' y='30' style='font-size:10px;font-weight:10'>" + maxdata + "</text>";
    // 绘制月份
    var month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    for(var i = 0; i < 12; i++) {
        text += "<text x='" + (40 + i * (30 + gap)) + "' y='360' style='font-size:10px;font-weight:10'>" + month[i] + "</text>";
    }

    mainbar.innerHTML += xaxis;
    mainbar.innerHTML += yaxis;
    mainbar.innerHTML += text;
}

//绘制多条条形图
function drawBars(targetData) {
    var mainbar = document.getElementById('mainbar');
    mainbar.innerHTML = '';
    var barcolor = ['#F2635E','#79C2AA','#F4DC78','#00C8EB','#D9821C','#6989AA','#7CCB8F','#FF9A3B','#9C95F5'];
    var ratio = proportion(targetData);
    var width = 30 / targetData.length;
    for(var i = 0; i < targetData.length; i++) {
        drawBar(targetData[i].sale, barcolor[i], width, ratio, i);
    }
}