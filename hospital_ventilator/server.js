const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')
var app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) =>{
    res.render('layouts/main')
})

// app.post('/')

PORT = 3000

app.listen(PORT,() => {console.log(`Server Started on PORT ${PORT}`)})




