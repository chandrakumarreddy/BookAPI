const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("Home page rendering");
});

const PORT = process.env.port || 3000;

app.listen(PORT, (req, res) => {
	console.log("server started at port 3000");
});
