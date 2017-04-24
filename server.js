var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config');
var port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/travel', require("./routes/travelRoutes"));

app.use(express.static(path.join(__dirname, "public")));
mongoose.connect(config.database);
mongoose.connect('mongodb://localhost/travelapp', function(err){
    if (err) throw err;
});

app.get('/', function(req,res){
    res.send("It's working");
});

app.listen(port, function(){
    console.log('Server listening on port ' + port);
});

//Make a primitive social site
//Users MUST log in. After login, they have a list of languages they are learning or want to learn
//and places they want to go. People can add friends and comment on their profiles.


