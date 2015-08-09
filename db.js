var mongodb = require('mongodb');

var exports = module.exports = {};

var mongoClient = mongodb.MongoClient;
var dbUrl = 'mongodb://localhost:27017/eventify';

var dbHandle = {};

// var sampleUser = {
// 	username: <user-name>,	// primary-index
// 	password: <password>,
// 	email: <email-id>,
// 	events: [eventId...]
// }

// var sampleEvent = {
// 	eventId: 1,	// primary-index
// 	img: <img-url>,
// 	name: eventName,
// 	address: eventAddress,
// 	date: eventDate
// }

var eventsCollection = {};
var usersCollection = {};
var attendenceCollection = {};

var setupDb = function(db) {
	eventsCollection = db.collection('events');
	// create an index on eventId and add an unique constraint to avoid duplicates.
	eventsCollection.ensureIndex({eventId: 1}, {unique: true});

	usersCollection = db.collection('users');
	// create an index on username and add an unique constraint to avoid duplicates.
	usersCollection.createIndex({username: 1}, {unique: true});

	attendenceCollection = db.collection('attendence');
	attendenceCollection.createIndex({username: 1}, {unique: true});

	// set the global db handle.
	dbHandle = db;

	console.log("Database successfully setup!");
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

exports.findUsers = function(query, doneFn) {
	usersCollection.find(query).toArray(function(err, result) {
		doneFn(err, result);
	});
}

exports.findAttendence = function(query, doneFn) {
	attendenceCollection.find(query).toArray(function(err, result) {
		doneFn(err, result);
	});
}

exports.insertEvents = function(obj, doneFn) {
	eventsCollection.insert(obj, doneFn);
}

exports.insertUsers = function(obj, doneFn) {
	usersCollection.insert(obj, doneFn);
}

exports.insertAttendence = function(obj, doneFn) {
	attendenceCollection.insert(obj, doneFn);
}
