const express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser");

const db = mongoose.connect("mongodb://localhost:27017/booksApi");
const Books = require("./models/booksModel");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const bookRouter = require("./Routes/booksRoute")(Books);

app.use("/api/books", bookRouter);

app.get("/", (req, res) => {
	res.send("Home page rendering");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
	console.log(`server started at port ${PORT}`);
});
