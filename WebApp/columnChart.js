google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(pm10,pm2,vremeMerenja) {
  var data = new google.visualization.DataTable();
      data.addColumn('string', 'vreme');
      data.addColumn('number', 'PM-10');
      data.addColumn('number', 'PM-2');
      

      for (var i = 9; i >= 0; i--) {
        data.addRows([
          [vremeMerenja[i], pm10[i], pm2[i]]
        ]);
      }


  var options = {
    chart: {
      title: 'Vrednost PM-10 i PM-2 cestica'
    },
    hAxis: {
          title: 'Vreme merenja'
    },
    vAxis: {
      title: 'Vrednost μg/m3'
    }
  };

  var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
  document.getElementById("columnchart_material").style.height = "500px";

  chart.draw(data, google.charts.Bar.convertOptions(options));

}