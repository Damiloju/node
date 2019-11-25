const {
	MongoClient,
	ObjectId
} = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(connectionURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(client => {
		const db = client.db(databaseName);

		db.collection("tasks")
			.findOne({
				_id: new ObjectId("5d88e155bbf87e42d0fb617a")
			})
			.then(result => {
				console.log(result, 'here');
			})
			.catch(err => {
				console.log("Could not add record to database", err);
			});

		client.close();
	})
	.catch(err => {
		console.log("Unable to connect to database", err);
	});