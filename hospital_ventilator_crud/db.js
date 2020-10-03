const MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017";

function insertHospital(obj) {
    console.log('inserting called in db')
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var DB = db.db("hospital_ventilator");
        DB.collection("hospitals").insertOne(obj, (err, res) => {
            if (err) throw err;
            console.log('inserted hospital : ')
            db.close();
            return res;
        })
    })
    console.log('inserted hospital', obj);
}

function searchHospitalByName(name) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var DB = db.db("hospital_ventilator");
        var query = { Name: name };
        DB.collection("hospitals").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            return result;
        });
    });
}

function deleteHospitalById(id){
   console.log('deleting called in db' + id)

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var DB = db.db("hospital_ventilator");
        var obj = {hId : id}
        DB.collection("hospitals").deleteOne(obj, (err, res) => {
            if (err) throw err;
            console.log('deleted hospital : ')
            db.close();
            return res;
        })
    })
    console.log('inserted hospital out func');
}

function getAllHospitals(){
    console.log('get all called in db')
    var objs
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var DB = db.db("hospital_ventilator");
        DB.collection("hospitals").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            objs = result;
            console.log('debug 1')
            console.log('debug 2')
            console.log(objs)
            result = JSON.stringify(objs)
            console.log(typeof objs)
            return result;
        });
        db.close();
    });
    console.log('returned from get all hospitals')
    return objs
}

exports.insertHospital = insertHospital
exports.searchHospitalByName = searchHospitalByName
exports.getAllHospitals = getAllHospitals
exports.deleteHospitalById = deleteHospitalById





