const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("hospital_ventilator");
//     dbo.collection("users").insertOne({username: "srinivas", pass: "clasher"})
// });


var app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

app.get('/', (req, res) =>{
    console.log('hello get');
    res.render('login')
    // res.render('home', {
    //     content: "content"
    // });
});

var arr = [1, 2, 3]
app.post('/', (req, res) =>{
    console.log('post worked')
    var user = req.body.username
    var pass = req.body.pass

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("hospital_ventilator");
        var query = { username: user, pass: pass};
        dbo.collection("users").find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          if (result.length === 0) {
              res.render('login', {error: true})
              db.close()
              return;
          }
          console.log('body : ' + user + " " + pass)
          db.close();
        });
    });
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("hospital_ventilator");
        dbo.collection("hospitals").find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          if (result.length === 0) {
              db.close()
              return;
          }
          res.render('table', {ele: result})
          db.close();
        });
    });
})

app.post('/table', (req, res) =>{
    var temp = req.body
    console.log(temp)
    res.render('table')
});
PORT = 5231

app.listen(PORT,() => {console.log(`Server Started on PORT ${PORT}`)})




