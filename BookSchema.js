let mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    booktitle: {
        type: String,
        required: true
    },
    PubYear: Number,
    author: String,
    Topic: String,
    formate: String
});

module.exports = mongoose.model('Book', BookSchema, 'BookCollection2');