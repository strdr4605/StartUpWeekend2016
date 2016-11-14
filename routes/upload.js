const router = require('express').Router()
var multer = require('multer')


router.param('email',  function (req, res, next, name) {
  global.mail = name
  next();
});
fileList = []
var storage = multer.diskStorage({
  destination: './public/images/',
  filename: function (req, file, cb) {
      let name = mail + '-' + Date.now() + '.' + file.originalname.split('.')[1]
      fileList.push(name)
      cb(null, name)
    }
});

var upload = multer({ storage: storage });

router.post('/:email',upload.array('avatar', 20), function (req, res, next) {
      res.send({message: "Files saved"})
      console.log(fileList)
    });



module.exports = router
