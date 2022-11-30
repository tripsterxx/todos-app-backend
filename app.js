const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/healthcheck", (req, res) => {
	res.send("API working Fine!");
});

app.listen(port, () => {
	console.log(`TODO's app listening on port ${port}`);
});
