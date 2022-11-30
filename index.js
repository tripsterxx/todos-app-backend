const app = require("./app");
require("dotenv").config();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
	console.log(`server is running at port: ${process.env.PORT}`);
});
