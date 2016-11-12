const router = require('express').Router()
var multer = require('multer')

var storage = multer.diskStorage({
  destination: './public/images/',
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage })

router.post('/', upload.array('avatar', 20), function (req, res, next) {
      res.send({message: "Files saved"})
    });

module.exports = router
