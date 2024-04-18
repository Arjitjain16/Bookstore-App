var express = require('express');
var router = express.Router();

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
  try {
    res.json({body:req.body, file:req.file})
  } catch (error) {
    console.log(error)
  }
  // try{
  //   const newbook = new books(req.body)
  //   await newbook.save()
  //   res.redirect("/readall")
  // }
  // catch(err){
  //   res.send(err)
  // }
  //--------------------------------
  // BOOKS.push(req.body)
  // res.redirect("/readall")
  // then catch se -----------------------
  // books.create(req.body).then(()=>{
  //   res.redirect('/readall')
  // }).catch((err)=> res.send(err))
  //--------------using async and try catch-----------------

});


router.get('/readall', async function(req, res, next) {
  // res.render(library)
  // res.json(BOOKS)
  //normal code
  // res.render('library' , {books : BOOKS})
  //
  // books.find().then((books)=>{
  //   res.render("library", {books : books})
  // }).catch((err) => res.send(err))
  try {
    
  } catch (error) {
    
  }
});

/* GET Delete . */

// router.get('/delete/:index', function(req, res, next) {
//   BOOKS.splice(req.params.index,1)
//   res.redirect('/readall')
// });

// -------------------------
router.get('/delete/:id', async function(req,res,next){
  try {
    await books.findByIdAndDelete(re.params.id)
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
