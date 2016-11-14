const router = require('express').Router(),
      ImageInfo = require('../models/imageInfo')

router.get('/getAllimageInfo', (req, res) =>{
  ImageInfo.find({}, (err, doc) => {
    if (err) {
      res.json(err)
    } else {
      res.json(doc)
    }
})
})

router.post('/', (req, res) =>{
  let info = req.body;
  var newInfo = ImageInfo(info);
  newInfo.save(function(err) {
    if (err) throw err;
    console.log('ImageInfo created!');
  });
  res.send({message: 'Imageinfo created'});

})

module.exports = router
