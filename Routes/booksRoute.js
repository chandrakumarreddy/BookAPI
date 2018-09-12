const express = require("express");

const routes = Books => {
	const bookRouter = express.Router();
	const booksController = require("../Controllers/booksController")(Books);
	bookRouter
		.route("/")
		.post(booksController.post)
		.get(booksController.get);

	bookRouter.use("/:bookId", (req, res, next) => {
		Books.findById(req.params.bookId, (error, book) => {
			if (error) {
				res.status(500).send(error);
			} else if (book) {
				req.book = book;
				next();
			} else {
				res.status(202).send("Not found");
			}
		});
	});

	bookRouter
		.route("/:bookId")
		.get((req, res) => {
			var newBook = req.book.toJSON();
			newBook.link = {};
			var bookLink =
				"https://" +
				req.headers.host +
				"/api/books?genre=" +
				newBook.genre;
			newBook.link.self = bookLink.replace(" ", "%20");
			res.send(newBook);
		})
		.put((req, res) => {
			req.book.title = req.body.title;
			req.book.author = req.body.author;
			req.book.genre = req.body.genre;
			req.book.save((error, book) => {
				if (error) {
					res.status(500).send(error);
				} else {
					res.status(200).json(req.book);
				}
			});
		})
		.patch((req, res) => {
			if (req.body._id) delete req.books._id;
			for (var p in req.body) {
				req.book[p] = req.body[p];
			}
			req.book.save((error, book) => {
				if (error) {
					res.status(500).send(error);
				} else {
					res.status(200).json(req.book);
				}
			});
		})
		.delete((req, res) => {
			req.book.remove();
			res.status(204).send("deleted successfully");
		});

	return bookRouter;
};

module.exports = routes;
