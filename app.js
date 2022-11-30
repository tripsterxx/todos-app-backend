const express = require("express");
require("dotenv").config();
const app = express();

app.get("/healthcheck", (req, res) => {
	res.status(200).json({
		success: true,
		greeting: "API WORKING FINE!",
	});
});

module.exports = app;
