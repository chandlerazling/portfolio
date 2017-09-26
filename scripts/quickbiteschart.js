// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart1);
google.charts.setOnLoadCallback(drawChart2);
var options = {tooltip: {isHtml: true, text: 'percentage'}, 'fontName': "Muli", width:800 , height: 300, 'fontSize': 14, 'fontWeight': 200, colors: [ '#FF4519','#FF6F00', '#fc950f', '#ffbb00', '#ffd449']};

// Draw the chart and set the chart values
function drawChart1() {
  var data1 = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Deciding where to go',13],
  ['Figuring out what to order', 2],
  ['Ordering for others', 2],
  ['Wait time', 2],
  ['Communicating with server', 1] 
]);

var chart1 = new google.visualization.PieChart(document.getElementById('piechart1'));
  chart1.draw(data1, options);
}

function drawChart2() {
  var data2 = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Easier communication', 4],
  ['Better menus',2],
  ['Mobile payment', 1],
  ['Less pressure to order quickly', 1],
]);

var chart2 = new google.visualization.PieChart(document.getElementById('piechart2'));
  chart2.draw(data2, options);
}