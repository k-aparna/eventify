var mongodb = require('mongodb');

var exports = module.exports = {};

var mongoClient = mongodb.MongoClient;
var dbUrl = 'mongodb://localhost:27017/eventify';

var dbHandle = {};
var eventsCollection = {};
var usersCollection = {};

var testData = [
        {
            "eventId":"1",
            "img":"http://lorempixel.com/300/200/nature",
            "name": "Bootstrap meetup!",
            "address": "19239 Lowell Dr, Cupertino, CA",
            "date": "SAT, AUG 10 2015, 9 AM"
        },
        {
            "eventId":"2",
            "img":"http://lorempixel.com/300/200/city",
            "name": "Bootstrap meetup!",
            "address": "19239 Lowell Dr, Cupertino, CA",
            "date": "SAT, AUG 10 2015, 9 AM"
        },
        {
            "eventId":"3",
            "img":"http://lorempixel.com/300/200/abstract",
            "name": "Bootstrap meetup!",
            "address": "19239 Lowell Dr, Cupertino, CA",
            "date": "SAT, AUG 10 2015, 9 AM"
        },
        {
            "eventId":"4",
            "img":"http://lorempixel.com/300/200/sports",
            "name": "Bootstrap meetup!",
            "address": "19239 Lowell Dr, Cupertino, CA",
            "date": "SAT, AUG 10 2015, 9 AM"
        },
    ];

var setupDb = function(db) {
	eventsCollection = db.collection('events');
	// create an index on eventId and add an unique constraint to avoid duplicates.
	eventsCollection.ensureIndex({eventId: 1}, {unique: true});

	usersCollection = db.collection('users');
	// create an index on username and add an unique constraint to avoid duplicates.
	usersCollection.createIndex({username: 1}, {unique: true});

	// set the global db handle.
	dbHandle = db;

	// insert test data.
	insertEvents(testData, function(err, result) {
		if (err && err.code == 11000) {
			console.log("Ignoring duplicates.");
		} else if (err) {
			console.log("Failed to insert dummy events in the 'events' collection. Error: ", err);
			process.exit();	
		}
		// insert went fine.
		console.log("Database successfully setup!");
	});
}

exports.connect = function(doneFn) {
	mongoClient.connect(dbUrl, function(err, db){
		if (err) {
	        console.log("Failed to connect to database. Error:", err);
	        process.exit();
		} else {
			// all went smooth.
			setupDb(db);
			doneFn();
		}
	});
}

exports.findEvents = function(query, doneFn) {
	eventsCollection.find(query).toArray(function(err, result) {
		doneFn(err, result);
	});
}

var insertEvents = exports.insertEvents = function(obj, doneFn) {
	eventsCollection.insert(obj, doneFn);
}