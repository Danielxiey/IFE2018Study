//绘制单条折线
function drawLine(data,lineColor,ratio) {
    /** @type {HTMLCanvasElement} */
    var lineChart = document.getElementById('line');
    if(lineChart.getContext) {
        // 获取渲染上下文
        var ctx = lineChart.getContext('2d');
        //绘制坐标轴
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.moveTo(20,25);
        ctx.lineTo(20,340);
        ctx.lineTo(540,340);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        //获取折线图中的最大值，计算折算比例
        var proportion;
        if(!ratio) {
            var maxdata = data[0];
            for(var i = 0; i < data.length; i++) {
                if(data[i] > maxdata) {
                    maxdata = data[i];
                }
            }
            proportion = maxdata / 304;
        } else {
            proportion = ratio;
            maxdata = Math.floor(proportion * 304);
        }
        if(!lineColor) {
            lineColor = '#F2635E';
        } 
        
        //绘制折线图
        //定义折线的间隔、样式
        var gap = 42;
        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.fillText(maxdata, 0, 36);
        var month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
        for(var i = 0; i < 12; i++) {
            ctx.fillText(month[i], 35 + i * gap, 360);
        }
        ctx.strokeStyle = lineColor;
        ctx.fillStyle = '#fff';
        
        //绘制折线部分
        ctx.beginPath();
        for(var i = 0; i < data.length; i++) {
            var x = 45 + i * gap;
            var y = 340 - data[i] / proportion;
            if(i == 0) {
                ctx.moveTo(x,y);
            }
            ctx.lineTo(x,y);
        }
        ctx.stroke();
        ctx.closePath();

        //绘制折线点部分
        for(var i = 0; i < data.length; i++) {
            var x = 45 + i * gap;
            var y = 340 - data[i] / proportion;
            ctx.beginPath();
            ctx.arc(x,y,5,0,Math.PI * 2,false);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
    } else {
        alert("Sorry,your browser doesn't support Canvas");
    }
}

//计算多组数据时的数据比例，以绘制折线图和条形图
function proportion(targetData) {
    var maxdata = 0;
    var proportion = 0;
    for(var i = 0; i < targetData.length; i++) {
        var tempArray = targetData[i].sale;
        for(var j = 0; j < tempArray.length; j++) {
            if(Number(tempArray[j]) > maxdata) {
                maxdata = tempArray[j];
            }
        }
    }
    proportion = maxdata / 304;
    return proportion;
}

//绘制多条折线
function drawLines(targetData) {
    var lineColor = ['#F2635E','#79C2AA','#F4DC78','#00C8EB','#D9821C','#6989AA','#7CCB8F','#FF9A3B','#9C95F5'];
    var ctx = line.getContext('2d');
    var ratio = proportion(targetData);
    ctx.clearRect(0,0,600,380);
    for(i = 0; i < targetData.length; i++) {
        drawLine(targetData[i].sale, lineColor[i], ratio);
    }
}