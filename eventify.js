var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var uuid = require('uuid');
var db = require('./db.js');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

// Routes

app.get('/', function(req, res) {
    res.render('index.html'); 
});

app.get('/events', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    db.findEvents({}, function(err, result) {
        if (err) {
            console.log("Failed to find events. Error: " + err);
            res.status(404).send();
        } else {
            res.send(result);
        }
    })
});

app.get('/attendence', function(req, res) {
    db.findAttendence({}, function(err, result) {
        if (err) {
            console.log("Failed to find all attendence. Error: " + err);
            res.status(404).send();
        } else {
            res.send(result);
        }
    })
});

app.post('/attend', function(req, res) {
    var attendence = req.body;
    db.insertAttendence(attendence, function(err, result) {
        if (err) {
            console.log("Failed to insert attendence: " + attendence + ", error: " + err);
            res.status(404).send();
        } else {
            res.status(200).send();
        }
    });
});

app.post('/event', function(req, res) {
    var _event = req.body;
    _event.eventId = uuid.v4();
    db.insertEvents(_event, function(err, result) {
        if (err) {
            console.log("Failed to add event: " + JSON.stringify(_event) + ", error: " + err);
            res.status(404).send({success: false});
        } else {
            res.status(200).send({success: true});
        }
    });      
});

app.post('/events', function(req, res) {
    var _event = req.body;
    for (var index in _event) {
        _event[index].eventId = uuid.v4();
        db.insertEvents(_event[index], function(err, result) {
            if (err) {
                console.log("Failed to add event: " + JSON.stringify(_event[index]) + ", error: " + err);
                res.status(404).send({success: false});
            } else {
                res.status(200).send({success: true});
            }
        });        
    }
    
});

app.post('/register', function(req, res) {
    var user = req.body;
    db.insertUsers(user, function(err, result) {
        if (err) {
            console.log("Failed to register: " + user + ", error: " + err);
            res.status(404).send({success: false});
        } else {
            res.status(200).send({success: true});
        }
    });
});

app.post('/login', function(req, res) {
    var loginInfo = req.body;
    console.log(req.body);
    db.findUsers({username: loginInfo.username, password: loginInfo.password}, function(err, result) {
        if (err) {
            console.log("Failed to find the requested user. " + loginInfo + ", error: " + err);
            res.status(401).send({success: false});
        } else if (!result.length) {
            res.status(401).send({success: false});
        } else {
            res.status(200).send({success: true});
        }
    });
});

db.connect(function() {
    var server = app.listen(3000, function() {
        console.log('Listening...');
    });
});

