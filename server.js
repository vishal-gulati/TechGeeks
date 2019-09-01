var express = require("express");
var app     = express();
var path    = require("path");
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "newbornbabies"
});
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/log.html'));
});
app.post('/submit',function(req,res){

  var birth_certificate_number=req.body.birth_certificate_number;
  var age=req.body.age;
  var district=req.body.district;
  var hospital=req.body.hospital;
  var weight=req.body.weight;
  var diagnosis=req.body.diagnosis;
  var outcome=req.body.outcome;
  var comments=req.body.comments;

res.redirect('/')
  con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO newborns (birth_certificate_number,age,district,hospital,weight,diagnosis,outcome,comments) VALUES ("+birth_certificate_number+","+age+",'"+district+"','"+hospital+"',"+weight+",'"+diagnosis+"','"+outcome+"','"+comments+"');";
  
  // db.query('SELECT * FROM newborns WHERE weight<1800', [weight], function (err, results) {
  //   if (err) {
  //     console.info(err);
  //   } else {
  //     var x = results[0].value;
  //     console.log("x");
  //     // socket.emit('chart_data', {
  //     //   x: x,
  
  //     };

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
     
  });
  });
})

var i = 0;
// con.connect(function(err) {
//   if (err) throw err;
//   // con.query("SELECT COUNT(weight) FROM newborns WHERE weight<=1800 ", function (err, result) {
//   //   if (err) throw err;
//   //   {console.log(result);
    
//   //   console.log(COUNT)}
    
//   // });

//  console.log(Count)
// });
var userdata = 1800;
let a;
let b;
let c;
var sqlcount = 'SELECT COUNT(weight) AS count FROM newborns WHERE weight >=1800 '
var sqlcount2 = 'SELECT COUNT(weight) AS count FROM newborns WHERE weight <1800'
var sqlcount3 = 'SELECT COUNT(weight) AS count FROM newborns WHERE weight >=2500'
con.query(sqlcount, [userdata], function(err, rows, fields) {
  if (err) throw err;
  console.log('Query result: ', rows);
  a=rows[0].count;
  // console.log(a);
  con.query(sqlcount2, [userdata], function(err, rows, fields) {
    if (err) throw err;
    console.log('Query result: ', rows);
    b=rows[0].count;
    // console.log(a);
    con.query(sqlcount2, [userdata], function(err, rows, fields) {
      if (err) throw err;
      console.log('Query result: ', rows);
      c=rows[0].count;
      console.log(c);
      

      var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data = {
          datasets: [{
              data: [a, b, c]
          }],
      
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: [
              'Red',
              'Yellow',
              'Blue'
          ]
      },
        options: {}
    });

    });
  });
  
});

app.listen(3000);
