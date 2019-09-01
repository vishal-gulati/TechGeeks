var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'newbornbabies'
  });
  
<canvas id="myChart" width="400" height="400"></canvas>
<script>
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
</script>


db.connect(function (err) {
  if (err) console.log(err);
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var id = 1;

io.sockets.on('connection', function (socket) {

    
    var timer = setInterval(function() {
      if (++id < 100) {
        db.query('SELECT * FROM newborns WHERE weight<1800', [weight], function (err, results) {
          if (err) {
            console.info(err);
          } else {
            var x = results[0].time,
                y = results[0].value;

            socket.emit('chart_data', {
              x: x,
              y: y
            });
            console.info("emitted: [" + x + "," + y + "]");  
          }
        });
      } else {
        clearInterval(timer);
      }
    }, 1000); //update setiap 1 detik*/
  });

http.listen(3000, function(){
  console.log('listening on *:3000'); //jalankan server di port 3000
});