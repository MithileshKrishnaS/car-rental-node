const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var port = process.env.PORT||8081;
var mysql = require('mysql');
app.use(express.static('public'));  
const Sequelize = require('sequelize'); 
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

const sequelize =   new Sequelize('car','root','manager,',{
    dialect:'mysql',
    host:'localhost'
})

const Cars = sequelize.define("cars",{
    carId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    carModel:{
        type: Sequelize.STRING,
        allowNull: false
    },
    carNo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

sequelize.sync()
    .then((result)=>{
        console.log('synced')
    })
    .catch((err)=>{
        console.log(err)
    })

function getcar(req,res){
    Cars.findAll().then(result => {  
        console.log(result)     
        res.send(result)
    }).catch(function (err) {
        console.log("create failed with error: " + err );
        return 0;
    });
}

//insert
app.post('/saveCar', function(req, res){
    var data=req.body;
    data.carId=Number(data.carId);
    console.log(data);
    Cars.create({ 
    carId:data.carId,
    carModel:data.carModel,
    carNo:data.carNo,
    status:data.status
    }).then(result => {       
        getcar(req,res)
    })
});

//display
app.get('/getCar', function(req, res){
    Cars.findAll().then(result => {       
        res.send(result)
    }).catch(function (err) {
        console.log("create failed with error: " + err );
        return 0;
    });
});

//display by id
app.get('/getCarid/:id', function(req, res){
    Cars.findAll({where:{carId:req.params.id}})
    .then(result=>{
        console.log(result)
        res.send(result)
    }).catch(function (err) {
        console.log("create failed with error: " + err );
        return 0;
    });
});

//update by id
app.post('/editCar/:id', function(req, res){
    let car=req.body;
    Cars.update(
        {carModel:car.carModel,carNo:car.carNo,status:car.status},
        {where:{carId:req.params.id}}
        )
        .then((result)=>{
            getcar(req,res)
        })
});

//delete by id
app.post('/deleteCar/:id', function(req, res){
    Cars.destroy({where:{carId:req.params.id}})
    .then((result)=>{
        getcar(req,res)
    })
});

app.get('/', function(req, res){
    res.send('server runnning')
});
