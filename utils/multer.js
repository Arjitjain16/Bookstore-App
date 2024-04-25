const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null,  Date.now() + path.extname(file.originalname))
    }
})

const filefilter = (req, file, cb) =>{
  // console.log(file)
  let allowedfiles = /png|jpg|jpeg|svg|webp|gif/;
  let mimetype = allowedfiles.test(file.mimetype)
  let extname = allowedfiles.test(
    path.extname(file.originalname).toLowerCase()
  )
  if(extname && mimetype){
    cb(null, true)
  }else{
    cb(`Error only ${allowedfiles} image extensions are allowed`)
  }
}


  
  const upload = multer({ storage: storage,fileFilter:filefilter  })

  module.exports = upload