var PDF = require('pdfkit');            //including the pdfkit module
var fs = require('fs');                 //including the file system module
var text = 'Fuck you';        //define a dummy text to be written in the file
var request = require('request');

doc = new PDF();                        //creating a new PDF object

//creating a write stream to write the content on the file system

doc.pipe(fs.createWriteStream(__dirname + '/public/pdf/testing_file.pdf'));


//Now this is the code snippet to get the image using the url

module.exports = function () {
  request({
    url: 'http://localhost:3000/images/seaStorm.jpg',
    encoding: null // Prevents Request from converting response to string
  }, function(err, response, body) {
    if (err) throw err;

    // Inject the image with the required attributes

    doc.image(body,110,50,{height:400,width:400});
    doc.text('Sea Storm',80,500,{align:'center'})
    doc.text('Cool Picture',278,520);

    // Close document and, by extension, response
    doc.end();
    return;
  });
}
