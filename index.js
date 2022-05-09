var express = require("express")
var path = require("path")
var app = express()
var db = require("./database.js")

var bodyParser = require("body-parser");
const { name } = require("ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
var a="";

app.listen(5000, () => {
    console.log("Application started and Listening on port 5000");
  });

  app.get('/', (req, res) => {
    
    res.render('index.ejs')  
    });
    app.get('/about', (req, res) => {
      res.render('about.ejs')  
      });
      app.get('/contact', (req, res) => {
        res.render('contact.ejs')  
        });
        
        
    app.get('/sign', (req, res) => {
      res.render('sign_up.ejs')  
      });
      app.get('/septic', (req, res) => {
        res.render('septic.ejs')  
        });

        app.get('/garden', (req, res) => {
          res.render('garden.ejs')  
          });
          app.get('/apartment', (req, res) => {
            res.render('apartment.ejs')  
            });
          
        app.get('/industrial', (req, res) => {
          res.render('industrial.ejs')  
          });
          app.get('/move_in', (req, res) => {
            res.render('move_in.ejs')  
            });
            app.get('/move_out', (req, res) => {
              res.render('move_out.ejs')  
              });
              app.get('/renovation', (req, res) => {
                res.render('renovation.ejs')  
                });
                app.get('/carpet', (req, res) => {
                  res.render('carpet.ejs')  
                  });
                  app.get('/warehouse', (req, res) => {
                    res.render('warehouse.ejs')  
                    });
                  app.get("/mess",(req,res)=>{
                    res.render("mess.ejs");
                  }
                  );
     
      app.post("/sign_up", (req, res, next) => {
        var errors=[]  
        var data = {
            namee: req.body.name,
            email: req.body.e_m,
            contact : req.body.c_n,
            add:req.body.add,
            pass:req.body.pass

        }
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/mydb";
        
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("mydb");
        var myobj = { name: data.namee, contact_number: data.contact,email:data.email,address:data.add ,Password:data.pass};
        dbo.collection("tb_customers").insertOne(myobj, function(err, res) {
        if (err) throw err;
        db.close();
        });
        
        }
       
        );
        //res.sendFile(path.resolve(__dirname) + '/views/SIGN_UP.html'); 
        res.send('<h1>Registered Successfully</h1>');
      }
      
      );

      app.post("/login", (req, res, next) => {      
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/mydb";
        MongoClient.connect(url, function(err, db) {
          if (err) throw err; 
          var dbo = db.db("mydb");       
          dbo.collection("tb_customers").find({$and:[{name:req.body.user_name},{Password: req.body.u_password}]}).toArray(function(err, result) {
           
            
            if (err) 
            throw err;
           
            if(result.length > 0)
            {
              a=result[0].name;
              console.log(result[0].name);
  
              res.redirect('/user_profile');
            }
             db.close();
          
          })
        });
      });
      app.get('/user_profile', (req, res) => {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/mydb";
          MongoClient.connect(url, function(err, db) {
          if (err) throw err; 
          var dbo = db.db("mydb");       
          dbo.collection("tb_book").find({name:a}).toArray(function(err, result) {         
            
            if (err) throw err;
            console.log(result);
            res.render('user_profile.ejs', {getrow: result});             
           
            db.close();
          
          })
        });
        });


        app.get('/book', (req, res) => {
          var MongoClient = require('mongodb').MongoClient;
          var url = "mongodb://localhost:27017/mydb";
            MongoClient.connect(url, function(err, db) {
              var dbo = db.db("mydb"); 
            if (err) throw err; 
            console.log(a);
            if(a.length <= 0)
            {
              res.send("Please Login First");
             
            }
            else
            {
                   
              dbo.collection("tb_customers").find({name:a}).toArray(function(err, result) {         
                if (err) throw err;
                res.render('book.ejs', {getrow: result 
                });   
              }) 
            } 
          });
          });


          app.post("/book", (req, res, next) => {
            console.log('asdadasda');
            var errors=[]  
            var data = {
                namee: req.body.name,
                email: req.body.email,
                contact : req.body.contact,
                add:req.body.address,
                pass:req.body.pass,
                service: req.body.service
    
            }
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/mydb";
            
            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var dbo = db.db("mydb");
            var myobj = { name: data.namee, contact_number: data.contact,email:data.email,address:data.add ,Password:data.pass,Service:data.service};
            dbo.collection("tb_book").insertOne(myobj, function(err, res) {
            if (err) throw err;
           
            db.close();
            });
            
            
            });
          
            res.send("<h1>Service Booked Successfuly <h1>"+data.service); 
          });
  