var express = require("express");
let Books = require('./BookSchema');
let mongoose = require('mongoose');
const cors = require('cors');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourdatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

app.get('/', function(req, res) {
    res.send("Welcome to the Book API");
});

app.get('/about', function(req, res) {
    res.send("MongoDB, Express, React, and Mongoose app. React runs in a separate app.");
    Books.countDocuments().exec()
        .then(count => {
            console.log("Total documents count before addition:", count);
        })
        .catch(err => {
            console.error(err);
        });
});

app.get('/allbooks', function(req, res) {
    Books.find(function(err, allBooks) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch books' });
        } else {
            res.json(allBooks);
        }
    });
});

app.get('/getbook/:id', function(req, res) {
    let id = req.params.id;
    Books.findById(id, function(err, book) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch the book' });
        } else {
            res.json(book);
        }
    });
});

app.post('/addbooks', function(req, res) {
    let newBook = new Books(req.body);
    newBook.save()
        .then(() => {
            res.status(200).json({ message: 'Book added successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ error: 'Adding new book failed' });
        });
});

app.post('/updatebook/:id', function(req, res) {
    let id = req.params.id;
    let updatedBook = req.body;

    Books.findByIdAndUpdate(id, updatedBook, { new: true }, function(err, docs) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to update book' });
        } else {
            res.status(200).json({ message: 'Book updated successfully', book: docs });
        }
    });
});

app.post('/deleteBook/:id', function(req, res) {
    let id = req.params.id;
    Books.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to delete book' });
        } else {
            res.status(200).json({ message: 'Book deleted successfully' });
        }
    });
});

app.listen(5000, function() {
    console.log("Server is running on port 5000");
});