const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/bookstore").then(()=>console.log("MONGODB CONNECTED")).catch((err)=>console.log(err.message))


module.exports = mongoose