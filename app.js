const express = require("express");
const app = express();
require("dotenv").config();
const { client } = require("./database/db");
const nanoid = require("nanoid");

//regular middlewares
//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/healthcheck", (req, res) => {
	res.status(200).json({
		success: true,
		greeting: "API WORKING FINE!",
	});
});

app.post("/addtodo", async (req, res) => {
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
	const result = await client
		.db("todoapp")
		.collection("todo_items")
		.insertOne(data);
	console.log(`New task created with id: ${result.insertedId}`);

	res.status(200).json({
		success: true,
		message: `New task created with id: ${result.insertedId}`,
	});
	await client.close();
});

module.exports = app;
