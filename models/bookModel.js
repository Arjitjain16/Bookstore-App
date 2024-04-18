const mongoose = require("mongoose")

const bookModel = new mongoose.Schema({
    bookname : String,
    bookprice : Number,
    authorname : String,
    bookquantity : Number,
    bookcategory : String,
    description : String
})

const Books = mongoose.model("book",bookModel)

module.exports = Books