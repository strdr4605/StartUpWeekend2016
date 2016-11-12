var PDF = require('pdfkit');            //including the pdfkit module
var fs = require('fs');                 //including the file system module
var text = 'Fuck you';        //define a dummy text to be written in the file
var request = require('request');
ImageInfo = require('./models/imageInfo')

var doc = new PDF();                        //creating a new PDF object

//creating a write stream to write the content on the file system

doc.pipe(fs.createWriteStream(__dirname + '/public/pdf/file.pdf'));

function createImagePage (imageUrl, position, nr, title, size, price, medium, material) {
  console.log(imageUrl, position, nr, title, size, price, medium, material)
    // if (err) throw err;
    // Inject the image with the required attributes
    doc.image(imageUrl,position.x,position.y,{height:size.height,width:size.width})
    doc.text('Article Nr: ' + nr.value, nr.x, nr.y)
    doc.text('Title: ' + title.value, title.x, title.y)
    doc.text('Price: ' + price.value, price.x, price.y)
    doc.text('Size: ' + size.value.width + 'x' + size.value.height, size.x, size.y)
    doc.text('Medium: ' + medium.value, medium.x, medium.y)
    doc.text('Material: ' + material.value, material.x, material.y)
    // Close document and, by extension, response
}

function addPage() {
  doc.addPage()
}

//Now this is the code snippet to get the image using the url

module.exports = function (email) {
  ImageInfo.find({email: email}, (err, images) => {
    if (err) {
      throw err
    } else {
      for(i = 0; i < images.length - 1; i++) {
        createImagePage('public' + images[i].url, {x: 20, y: 300}, {value: i + 1, x: 20, y: 0}, {value: images[i].title, x: 20, y: 20}, {value: images[i].size, x: 20, y: 40},
        {value: images[i].price, x: 20, y: 60}, {value: images[i].medium, x: 20, y: 80}, {value: images[i].material, x: 20, y: 100})
        addPage()
      }
      createImagePage('public' + images[images.length - 1].url, {x: 20, y: 300}, {value: images.length - 1 + 1, x: 20, y: 0}, {value: images[images.length - 1].title, x: 20, y: 20}, {value: images[images.length - 1].size, x: 20, y: 40},
      {value: images[images.length - 1].price, x: 20, y: 60}, {value: images[images.length - 1].medium, x: 20, y: 80}, {value: images[images.length - 1].material, x: 20, y: 100})
      doc.end()
    }
})
}
