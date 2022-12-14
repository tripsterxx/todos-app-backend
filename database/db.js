const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.DB_URL;
const client = new MongoClient(uri, {
	useUnifiedTopology: true,
});

//function for database connection
async function databaseConnect() {
	try {
		//connect to database
		await client.connect();
		console.log("Database connection successful!");
	} catch {
		(err) => {
			console.log("DB DISCONNECTED!! SOME ERROR OCCURED.");
			console.error(err.stack);
			process.exit(1);
		};
	}
}

module.exports = { databaseConnect, client };
