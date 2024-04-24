var express = require('express');
var router = express.Router();
var path  = require("path")
const fs = require("fs")

const upload = require("../utils/multer").single("image")

const books = require("../models/bookModel");
const BOOKS = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/create', function(req, res, next) {
  res.render('Entry');
});
router.post('/create', upload, async function(req, res, next) {
  try{
    const newbook = new books({...req.body, image: req.file.filename})
    await newbook.save()
    res.redirect("/readall")
  }
  catch(err){
    res.send(err)
  }
});

// read
router.get('/readall', async function(req, res, next) {
  try {
    const findall = await books.find()
    res.render("library", {books : findall})
  } catch (error) {
    res.send(error);
  }
});

/* GET Delete . */
router.get('/delete/:id', async function(req,res,next){
  try {
    await books.findByIdAndDelete(req.params.id)

    fs.unlink(path.join(__dirname, "../" , "public", "images", books.image))

    res.redirect('/readall')
   }catch(error){
    res.send(error)
  }
})

// update 
router.get('/update/:id', async function(req, res, next) {
  try{
    const Book = await books.findById(req.params.id)
    res.render("update", {book : Book})
  }catch(error){
    res.send(error)
  }

  // const i = req.params.index
  // const b = BOOKS[i]
  // res.render("update",{book : b , index : i})
});
router.post('/update/:id', async function(req, res, next) {
  try{
    await books.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/readall")
  }catch(error){
    console.log(error)

  }
  // const i = req.params.index
  // BOOKS[i] = req.body
  // res.redirect("/readall")
});


router.get('/bookstore', function(req, res, next) {
  res.render('bookstore');
});

module.exports = router;
