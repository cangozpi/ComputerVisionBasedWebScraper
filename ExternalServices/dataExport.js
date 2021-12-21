const fs = require('fs')

const imageFolder = './DataScraper/images/';
const ocrFolder = './OCR/OCR_output/';


// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}

fs.readdir(imageFolder, function (err, files) {
    let data = []

    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    //listing all files using forEach
    files.forEach(function (file) {
        
        // Do whatever you want to do with the file
        if (file.includes('photo')){
        data.push({file: base64_encode(imageFolder + file)});
        }
    });
    let jsonData = JSON.stringify(data);
    fs.writeFileSync('data.json', jsonData);
});

fs.readdir(ocrFolder, function (err, files) {
    let data = []
 

    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 


    fs.readFile('data.json', function (err, dat) {
        var json ={}
        json.images = JSON.parse(dat)

        files.forEach(function (file) {
            // Do whatever you want to do with the file
            var ocr = fs.readFileSync(ocrFolder + file, {encoding:'utf8', flag:'r'});
            data.push({file : ocr})
        });
      json.ocr_output = data
      fs.writeFileSync("data.json", JSON.stringify(json))
     
    })
});
