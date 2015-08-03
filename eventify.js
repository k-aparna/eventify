var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res) {
    res.render('index.html'); 
});

app.get('/events/all', function(req, res) {
    var events = [
        {
            "img":"http://lorempixel.com/300/200/nature",
            "name": "Bootstrap meetup!",
            "address": "19239 Lowell Dr, Cupertino, CA",
            "date": "SAT, AUG 10 2015, 9 AM"
        },
        {
            "img":"http://lorempixel.com/300/200/city",
            "name": "Bootstrap meetup!",
            "address": "19239 Lowell Dr, Cupertino, CA",
            "date": "SAT, AUG 10 2015, 9 AM"
        },
        {
            "img":"http://lorempixel.com/300/200/abstract",
            "name": "Bootstrap meetup!",
            "address": "19239 Lowell Dr, Cupertino, CA",
            "date": "SAT, AUG 10 2015, 9 AM"
        },
        {
            "img":"http://lorempixel.com/300/200/sports",
            "name": "Bootstrap meetup!",
            "address": "19239 Lowell Dr, Cupertino, CA",
            "date": "SAT, AUG 10 2015, 9 AM"
        },
    ];
    res.setHeader('Content-Type', 'application/json');
    res.send(events);
});

var server = app.listen(3000, function() {
    console.log('Listening...');
});
