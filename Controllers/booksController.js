const booksController = Books => {
	var post = (req, res) => {
		var book = new Books(req.body);
		book.save();
		res.status(201).send(book);
	};

	var get = (req, res) => {
		let query = {};
		if (req.query.genre) {
			query.genre = req.query.genre;
		}
		Books.find(query, (err, books) => {
			if (err) {
				res.status(500).send(err);
			} else {
				var returnBooks = [];
				books.forEach((element, index, array) => {
					var newBook = element.toJSON();
					newBook.link = {};
					newBook.link.self =
						"http://" +
						req.headers.host +
						"/api/books/" +
						newBook._id;
					returnBooks.push(newBook);
				});
				res.json(returnBooks);
			}
		});
	};
	return {
		post,
		get
	};
};

module.exports = booksController;
