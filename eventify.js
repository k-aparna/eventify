var express = require('express');
var bodyParser = require('body-parser');

var db = require('./db.js');

var app = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

// Routes

app.get('/', function(req, res) {
    res.render('index.html'); 
});

app.get('/events/all', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    db.findEvents({}, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
});

app.post('/events/create', function(req, res) {
    var _event = req.body;
    db.insertEvents(_event, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.sendStatus(200);
        }
    })
});

db.connect(function() {
    var server = app.listen(3000, function() {
        console.log('Listening...');
    });
});

