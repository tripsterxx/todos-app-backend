const { databaseConnect } = require("./database/db");
const app = require("./app");
require("dotenv").config();

//connect with database
databaseConnect();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
	console.log(`server is running at port: ${process.env.PORT}`);
});
