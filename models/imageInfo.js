  const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  let imageInfoSchema = new Schema({
    url: String,
    title: String,
    height: Number,
    width: Number,
    medium: String,
    material: String,
    price: Number,
    author: String,
    age: Number,
    email: String,
    size:[Number]
  },
{
  collection: 'imageInfo'
});

  let ImageInfo = mongoose.model('ImageInfo', imageInfoSchema);

  module.exports = ImageInfo;
