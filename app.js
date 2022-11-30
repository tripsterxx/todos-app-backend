const express = require("express");
const app = express();
require("dotenv").config();
const { client } = require("./database/db");
const nanoid = require("nanoid");

//regular middlewares
//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = "todoapp";
const collection = "todo_items";

app.get("/healthcheck", (req, res) => {
	res.status(200).json({
		success: true,
		greeting: "API WORKING FINE!",
	});
});

app.post("/api/v1/addtodo", async (req, res) => {
	console.log(req.body);
	const { email, task } = req.body;
	const date = Date.now();
	const _id = nanoid.nanoid();

	const data = {
		_id,
		date,
		email,
		task,
	};
	try {
		const result = await client.db(db).collection(collection).insertOne(data);
		console.log(`New task created with id: ${result.insertedId}`);

		res.status(200).json({
			success: true,
			message: `New task created with id: ${result.insertedId}`,
		});
		await client.close();
	} catch {
		res.status(400).json({
			success: true,
			message: `something went wrong while adding todo task!`,
		});
		console.log("something went wrong while adding todo task!");
	}
});

app.get("/api/v1/todo/:id", async (req, res) => {
	const id = req.query;
	const result = await client.db(db).collection(collection).findOne(id);

	if (result) {
		res.status(200).json({
			success: true,
			task: result.task,
			date: result.data,
		});
		await client.close();
	} else {
		res.status(400).json({
			success: false,
			message: "something went wrong!!",
		});
	}
});

app.get("/api/v1/alltasks", async (req, res) => {
	const { email } = req.body;
	try {
		const query = { email };
		const result = client.db(db).collection(collection).find(query);
		res.status(200).json({
			success: true,
			result,
		});
		await client.close();
	} catch {
		res.status(400).json({
			success: false,
			message: `something went wrong while fetching all the todo asks of the user with email: ${email}`,
		});
	}
});

module.exports = app;
