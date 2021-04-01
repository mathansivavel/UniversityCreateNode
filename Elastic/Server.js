const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());




// Connect to the db
var mongoose = require('mongoose').set('debug',true);

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1:27017/universityDb';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function () {
     console.log("DB Connected");  
});

//Define a schema
var Schema = mongoose.Schema;

var universityDetailsSchema = new Schema({
  id : Number,  
  alpha_two_code: String,
  country: String,
  domain : String,
  name : String,
  web_page : String,
  descrip : String,
});

var universityDetailsModel = mongoose.model("universitydetail", universityDetailsSchema );


var client = require('./connection.js');

client.cluster.health({},function(err,resp,status) {  
  console.log("-- Client Health --",resp);
});


app.get('/searchQuery', function (req, res) {
    var searchName = req.query.searchVal;
    var filter = req.query.filterVal;
    var query = {};

    if(filter === undefined){
       filter = " "
    }
    else {
        filter = filter
    }
    console.log("filter", searchName);
client.search({  
    index: 'univesitynew',
    _source: true,
    body: {
        "query" : {
            "fuzzy": {
                 "name" : {
                     "value" : searchName,
                     "fuzziness": "AUTO"
                  } 
                }
            }
                
    },
      
    

  },function (error, response,status) {
      if (error){
        console.log("search error: "+error)
      }
      else {
         
        console.log("--- Response ---");
        // console.log("--- Hits ---");
        console.log("JSON -----", JSON.stringify(response))
        console.log(response.body.hits.total);
        response.body.hits.hits.forEach(function(hit){
            console.log("--- Hits ---");
            console.log("-------------");
          console.log("--->",hit);
        })
        // JSON.stringify("JSON ---- ",response);
        client.on('response', (err, result) => {
            console.log(err, result)
          })
      }
  });
  
});

app.get('/', function (req, res) {
    universityDetailsModel.find(function(err,data){
        if(err){
            console.log("Error", err);
        }else{
            res.send(data);
        }
    });
  
});

app.get('/country', function (req, res) {
    universityDetailsModel.find().distinct('country',function(err,data){
        if(err){
            console.log("Error", err);
        }else{
            res.send(data);
        }
    });
  
});

app.get('/editDropdown', function (req, res) {
    universityDetailsModel.find().distinct('name',function(err,data){
        if(err){
            console.log("Error", err);
        }else{
           
            res.send(data);
        }
    });
  
});

app.post('/editName', function (req, res) {
    var editName = req.body.editName;
    var oldName = req.body.oldName;
    var newName = true;
    console.log("oldName", req.body);

    universityDetailsModel.find().distinct('name',function(err,data){
        if(err){
            console.log("Error", err);
        }else{
             const newVal = data.map(data => {
                 if(data.toUpperCase() === editName.toUpperCase()){
                    newName = false;
                     res.send("University Name Already Exists");
                 } 
             });

             if(newName){

                universityDetailsModel.updateOne({name: oldName},{name: editName},function(err,log){
                    if(err){
                        console.log("Error"+err);
                    }else{
                        res.send("University updated Successfully");
                    }
                      
                        });
             }
        }  
});
});

app.post('/deleteName', function (req, res) {
    var oldName = req.body.oldName;
    universityDetailsModel.remove({name : oldName}, function(err,data){
        if(err){
            console.log("Error", err);
        }else{ res.send("University deleted Successfully");}
    })
});

// app.get('/searchQuery', function (req, res) {
//     var searchName = req.query.searchVal;
//     var filter = req.query.filterVal;
//     var query = {};

//     if(filter === undefined){
//         query = {  "name" : {$regex: ".*"+searchName+".*" , $options:'i'} };
//     }
//     else {
//          query = { $and: [ {  "name" : {$regex: ".*"+searchName+".*" , $options:'i'} , "country" : {$in: filter} } ] };
//     }
   
//     universityDetailsModel.find( (query),function(err,data){
//         if(err){
//             console.log("Error", err);
//         }else{
//             res.send(data);
//         }
//     });
// });


app.post('/addUniversity', function (req, res) {
    var user = new universityDetailsModel( {
        alpha_two_code : req.body.formData.code,
        country : req.body.formData.country,
        domain : req.body.formData.domain,
        name : req.body.formData.name,
        descrip: req.body.formData.description,
        web_page: req.body.formData.web
    });
    var newName = true;
    console.log("req.body.formData.code", req.body.formData.description);
    universityDetailsModel.find().distinct('name',function(err,data){
        if(err){
            console.log("Error", err);
        }else{
             const newVal = data.map(data => {
                 if(data.toUpperCase() === req.body.formData.name.toUpperCase()){
                    newName = false;
                     res.send("University Name Already Exists");
                 } 
             });

             if(newName){
    user.save(function(err,data){
        if(err){
            console.log("Error",err);
        }else{
            res.send("University Added Successfully");
        }
    });
}
}  
});
});

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});