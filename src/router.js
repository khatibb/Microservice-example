var Router = require('express').Router
var router = new Router()
    // eslint-disable-next-line indent
    //var Book = require("./models/books_model")
    //var controller = require('./controller')

router.get('/', function(req, res) {
    res.json({ msg: 'books' })
})

// router.get("/api/v1/books", async(req, res) => {
//     var books = await Book.find({});
//     res.json(books);
// });

// router.post("/api/v1/books", async(req, res) => {
//     var book = new Book({ name: req.body.name });
//     var savedBook = await book.save();
//     res.json(savedBook);
// });





module.exports = router