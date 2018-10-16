function drawBar(data) {
    var mainbar = document.getElementById('mainbar');
    var xaxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xaxis.setAttribute('x1', '3%');
    xaxis.setAttribute('y1', '90%');
    xaxis.setAttribute('x2', '90%');
    xaxis.setAttribute('y2', '90%');
    xaxis.setAttribute('style', 'fill:black;stroke:black;stroke-width:2');

    var yaxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yaxis.setAttribute('x1', '3%');
    yaxis.setAttribute('y1', '5%');
    yaxis.setAttribute('x2', '3%');
    yaxis.setAttribute('y2', '90%');
    yaxis.setAttribute('style', 'fill:black;stroke:black;stroke-width:2'); 

    var maxdata =  data[0];
    for(var i = 0; i < data.length; i++) {
        if(data[i] > maxdata) {
            maxdata = data[i];
        }
    }

    var proportion = maxdata / 8;
    var gap = 2;
    for(var i = 0; i < data.length; i++) {
        var bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bar.setAttribute('x', 6 + i * (5 + gap) + '%' );
        bar.setAttribute('y', 90 - data[i] / proportion * 10 + '%');
        bar.setAttribute('width', '5%');
        bar.setAttribute('height', data[i] / proportion * 10 + '%');
        bar.setAttribute('style', 'fill:#61a0a8');
        mainbar.appendChild(bar);
    }
    mainbar.appendChild(xaxis);
    mainbar.appendChild(yaxis);
}