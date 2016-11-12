var PDF = require('pdfkit');            //including the pdfkit module
var fs = require('fs');                 //including the file system module
var text = 'Fuck you';        //define a dummy text to be written in the file
var request = require('request');
imageInfo = require('./models/imageInfo')

doc = new PDF();                        //creating a new PDF object

//creating a write stream to write the content on the file system

doc.pipe(fs.createWriteStream(__dirname + '/public/pdf/testing_file.pdf'));

createImagePage (imageUrl, position, nr, title, size, price, medium, material) {
  request({
    url: imageUrl,
    encoding: null // Prevents Request from converting response to string
  }, function(err, response, body) {
    if (err) throw err;
    // Inject the image with the required attributes
    doc.image(body,position.x,position.y,{height:size.height,width:size.width})
    doc.text('Article Nr: ' + nr.value, nr.x, nr.y)
    doc.text('Title: ' + title.value, title.x, title.y)
    doc.text('Price: ' + price.value, price.x, price.y)
    doc.text('Size: ' + size.value.width + 'x' + size.value.height, size.x, size.y)
    doc.text('Medium: ' + medium.value, medium.x, medium.y)
    doc.text('Material: ' + medium.value, medium.x, medium.y)
    // Close document and, by extension, response
  })
}

addPage() {
  doc.addPage()
}

//Now this is the code snippet to get the image using the url

module.exports = function (email) {
  ImageInfo.find({email: email}, (err, images) => {
    if (err) {
      throw err
    } else {
      for(i = 0; i < images.length; i++) {
        createImagePage(images[i].url, {x: 20, y: 300}, {value: i + 1, x: 20, y: 0}, {value: images[i].title, x: 20, y: 20}, {value: image[i].size, x: 20, y: 40},
        {value: image[i].price, x: 20, y: 60}, {value: image[i].medium, x: 20, y: 80}, {value: image[i].material, x: 20, y: 100})
        addPage()
      }
      doc.end()
    }
})
}
