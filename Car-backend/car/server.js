const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var port = 8081;
var mysql = require('mysql');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) )
app.listen(port, () => console.log(`listening on port ${port}!`));
app.all("*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
    });
app.use(cors(
    {
        origin: "*",
    }
))

var con = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database:""
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

//insert
app.post('/saveCar', function(req, res){
    var data=req.body;
    data.carId=Number(data.carId);
    console.log(data);
    let sql='INSERT INTO cars SET ?';
    con.query(sql,data,(err,result)=>{
        if (err) throw err
        res.send("data added")
    })
});

//display
app.get('/getCar', function(req, res){
    let sql='SELECT * FROM cars';
    con.query(sql,(err,result)=>{
        if (err) throw err
        console.log('displayed');
        res.json(result)
    })
});

//display by id
app.get('/getCarid/:id', function(req, res){
    let sql=`SELECT * FROM cars WHERE carId = ${req.params.id}`;
    con.query(sql,(err,result)=>{ 
        if (err) throw err
        console.log('displayed');
        res.send(result)
    })
});

//update by id
app.post('/editCar/:id', function(req, res){
    let car=req.body;
    //console.log(car)
    let sql=`UPDATE cars SET carModel='${car.carModel}',carNo='${car.carNo}',status='${car.status}' WHERE carId = ${req.params.id}`;
    con.query(sql,(err,result)=>{
        if (err) throw err
        console.log('updated');
        res.send(result)
    })
});

//delete by id
app.post('/deleteCar/:id', function(req, res){
    let sql=`DELETE FROM cars WHERE carId = ${req.params.id}`;
    con.query(sql,(err,result)=>{
        if (err) throw err
        console.log('deleted');
        res.send(result)
    })
});

app.get('/', function(req, res){
    let sql='SELECT * FROM cars';
    con.query(sql,(err,result)=>{
        if (err) throw err
        console.log('displayed');
        res.json(result)
    }) 
});


// app.post('/', function(req, res){
//     res.json({user:req.query.user});
// })
 
// app.put('/:id',function(req,res){
//     var json=fs.readFileSync('send.json')
//     var data=JSON.parse(json)
//     var newvalue=req.params.id;  
//     data = data.map(function(data) {
//         data[newvalue] = data['user']; 
//         delete data['user']; 
//         return data;
//     });
//     console.log(data)
//     res.json(data)
// })