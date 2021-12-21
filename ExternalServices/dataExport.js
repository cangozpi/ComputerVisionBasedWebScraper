const fs = require('fs')

const imageFolder = './DataScraper/images/';
const ocrFolder = './OCR/OCR_output/';
var data = {"be":"asss"};

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}

fs.readdir(imageFolder, function (err, files) {
  
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    ;

    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        data.as = "23232232"
        var encoding = base64_encode(imageFolder + file);
        console.log(encoding)
        data.file = encoding;
    });
});

fs.readdir(ocrFolder, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file

    });
});
console.log(data["as"]);
return JSON.stringify(data);