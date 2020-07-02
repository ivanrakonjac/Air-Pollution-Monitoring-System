google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawLineChart);

      function drawLineChart(so2,no2,co,o3,vremeMerenja) {
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'vreme');
          data.addColumn('number', 'SO2');
          data.addColumn('number', 'NO2');
          data.addColumn('number', 'CO');
          data.addColumn('number', 'O3');

          for (var i = 9; i >= 0; i--) {
            data.addRows([
              [vremeMerenja[i], so2[i], no2[i], co[i], o3[i]]
            ]);
          }

          var options = {
            chart: {
              title: 'Vrednost SO2, NO2, CO, O3'
            },
            hAxis: {
                  title: 'Vreme merenja'
            },
            vAxis: {
              title: 'Vrednost μg/m3'
            }
          };

          var chart = new google.charts.Line(document.getElementById('linechart_material'));
          document.getElementById("linechart_material").style.height = "500px";

          chart.draw(data, google.charts.Line.convertOptions(options));
      }