var express = require('express');
var router = express.Router();

const BOOKS = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/create', function(req, res, next) {
  res.render('Entry');
});
router.post('/create', function(req, res, next) {
  BOOKS.push(req.body)
  res.redirect("/readall")
});


router.get('/readall', function(req, res, next) {
  // res.render(library)
  // res.json(BOOKS)
  res.render('library' , {books : BOOKS})
});

/* GET Delete . */

router.get('/delete/:index', function(req, res, next) {
  BOOKS.splice(req.params.index,1)
  res.redirect('/readall')
});


router.get('/bookstore', function(req, res, next) {
  res.render('bookstore');
});

module.exports = router;
