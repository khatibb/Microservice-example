const Router = require('express').Router
const router = new Router()
const Book = require("./models/books_model")
var controller = require('./controller')
router.get("/", (req, res) => {
    res.json({ msg: "books" });
});

router.get("/api/v1/books", async(req, res) => {
    const books = await Book.find({});
    res.json(books);
});

router.post("/api/v1/books", async(req, res) => {
    const book = new Book({ name: req.body.name });
    const savedBook = await book.save();
    res.json(savedBook);
});





module.exports = router;