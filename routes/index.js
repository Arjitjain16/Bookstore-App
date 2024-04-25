var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");

const upload = require("../utils/multer").single("image");

const books = require("../models/bookModel");
const BOOKS = [];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/create", function (req, res, next) {
  res.render("Entry");
});
router.post("/create", async function (req, res, next) {
  try {
    await upload(req, res, async function (error) {
      if (error) {
        res.send(error);
        return;
      }
      const newbook = new books({ ...req.body, image: req.file.filename });
      await newbook.save();
      res.redirect("/readall");
    });
  } catch (err) {
    res.send(err);
  }
});

// read
router.get("/readall", async function (req, res, next) {
  try {
    const findall = await books.find();
    res.render("library", { books: findall });
  } catch (error) {
    res.send(error);
  }
});

/* GET Delete . */
router.get("/delete/:id", async function (req, res, next) {
  try {
    const delBook = await books.findByIdAndDelete(req.params.id);
    fs.unlinkSync(path.join(__dirname, "..", "public", "images", delBook.image));
    res.redirect("/readall");
  } catch (error) {
    res.send(error);
  }
});

// update
router.get("/update/:id", async function (req, res, next) {
  try {
    const Book = await books.findById(req.params.id);
    res.render("update", { book: Book });
  } catch (error) {
    res.send(error);
  }

  // const i = req.params.index
  // const b = BOOKS[i]
  // res.render("update",{book : b , index : i})
});

router.post("/update/:id", upload, async function (req, res, next) {
  try {
    const updateddata = { ...req.body };
    if (req.file) {
      updateddata.image = req.file.filename;
      fs.unlinkSync(
        path.join(__dirname, "..", "public", "images", req.body.oldimage)
      );
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/bookstore", function (req, res, next) {
  res.render("bookstore");
});

module.exports = router;
