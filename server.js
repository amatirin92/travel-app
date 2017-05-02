var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config');
var port = process.env.PORT || 5000;
var expressJwt = require('express-jwt')

mongoose.connect(config.database);
mongoose.createConnection('mongodb://localhost/travelapp', function (err) {
    if (err) throw err;
    console.log('Connected to the database')
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use('/auth', require('./routes/authRoutes'));
app.use('/api', expressJwt({secret: config.secret}));
app.use('/api/travel', require("./routes/travelRoutes"));

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

//Make a primitive social site
//Users MUST log in. After login, they have a list of languages they are learning or want to learn
//and places they want to go. People can add friends and comment on their profiles.

