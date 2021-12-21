const tesseract = require("node-tesseract-ocr")
const fs = require('fs')

const config = {
  lang: "tur",
  oem: 1,
  psm: 3,
}


const folder = './DataScraper/images/';

fs.readdirSync(folder).forEach(file => {
  console.log();
  
if (!file.includes('photo') && !file.includes('button')){
  console.log(folder + file)
  tesseract
  .recognize(folder + file, config)
  .then((text) => {
    fs.writeFile("./OCR/OCR_output/" + file.slice(0,-5)+".txt", text, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });
  console.log('Before')
  console.log(text)
  text = text.replace(/(\r\n|\n|\r|'\u{U+000c}')/gm, "");
  console.log('After')
  console.log(text)
  if (file.includes('review')){
    fs.appendFile("./OCR/merged_text.txt", text, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
  }
  fs.appendFile("./OCR/merged_text.txt", "\n", function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
    console.log("Result:", text)
  })
  .catch((error) => {
    console.log(error.message)
  })
  

};

});
