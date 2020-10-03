const express = require('express')
const bodyparser = require('body-parser')
const db = require('./db')
const MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017";
var app = express();
var urlEncodedParser = bodyparser.urlencoded({ extended: false })
var jsonParser = bodyparser.json()

app.get('/', (req, res) => {
    res.send('Root Response');
});

app.get('/hospitals', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var DB = db.db("hospital_ventilator");
        DB.collection("hospitals").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log(result);
            db.close();
            return result;
        });
    });
});

app.get('/hospitals/delete/:id', (req, res) => {
    console.log('deleting id app.js')
    var id = req.params.id
    db.deleteHospitalById(id)
    res.send('deleted id ' + id)
});

app.post('/hospitals/search', jsonParser, (req, res) => {
    var name = req.body.Name
    console.log('name = ' + name)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var DB = db.db("hospital_ventilator");
        var query = { Name: name };
        DB.collection("hospitals").find(query).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log(result);
            db.close();
            return result;
        });
    });
})

app.get('/ventilators', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var DB = db.db("hospital_ventilator");
        DB.collection("ventilators").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log(result);
            db.close();
            return result;
        });
    });
});

app.post('/hospitals/insert', jsonParser, (req, res) => {
    console.log('req body' + req.body)
    db.insertHospital(req.body)
    res.send(req.body)
});

app.post('/ventilators/insert', jsonParser, (req, res) => {
    console.log('req body' + req.body)
    console.log(req.body)
    console.log('inserting called in db')
    var obj = req.body
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var DB = db.db("hospital_ventilator");
        DB.collection("ventilators").insertOne(obj, (err, res) => {
            if (err) throw err;
            console.log('inserted vetilator')
            db.close();
            return res;
        })
    })
    res.send(req.body)
});

app.post('/ventilators/search', jsonParser, (req, res) => {
    var status = req.body.status
    var name = req.body.name
    var query
    if (status == undefined) {
        query = {name: name}
    }else {
        query = {status: status}
    }
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var DB = db.db("hospital_ventilator");
        DB.collection("ventilators").find(query).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log(result);
            db.close();
            return result;
        });
    });
})

// app.get('/ventilators/delete/:id', (req, res) => {
//     var id = req.params.id
//     MongoClient.connect(url, (err, db) => {
//         if (err) throw err;
//         var DB = db.db("hospital_ventilator");
//         var obj = {hId : id}
//         DB.collection("ventilators").deleteOne(obj, (err, result) => {
//             if (err) throw err;
//             console.log('deleted 1 ventilator')
//             db.close();
//             return result;
//         })
//     })
// })

app.post('/ventilators/delete', jsonParser, (req, res) => {
    var ventId = req.body.ventId
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var DB = db.db("hospital_ventilator");
        var obj = {ventilatorId : ventId}
        DB.collection("ventilators").deleteOne(obj, (err, result) => {
            if (err) throw err;
            console.log('deleted 1 ventilator')
            res.send(obj)
            db.close();
            return result;
        })
    })
})


app.listen(3000, () => {
    console.log('Server started!')
});

