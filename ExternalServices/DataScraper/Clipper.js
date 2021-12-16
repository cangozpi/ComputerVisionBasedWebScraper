const sharp = require('sharp');
var fs = require('fs')

// original image
let imagePath = './DataScraper/screenshot.jpeg';
let savedImagesPath = './DataScraper/images'
//Labels
let LABELS = ['title', 'seller', 'ratings', 'price', 'review', 'reviews_button', 'details_button', 'search_box', 'question', 'questions_button','product_info', 'product_specs', 'photo', 'selected_photo', 'main_photo', 'cookie_popup', 'cookie_accept', 'cookie_close', 'options', 'summary','product_desc']

// file name for cropped image





async function cropImage(image,imageHeight, imageWidth, outputImage, scaleLeft, scaleTop, scaleWidth, scaleHeight) {
    console.log(scaleLeft, scaleTop, scaleWidth, scaleHeight)

image.extract({ width: Math.round(imageWidth * scaleWidth), height: Math.round(imageHeight * scaleHeight), left: Math.round(imageWidth * scaleLeft), top: Math.round(imageHeight * scaleTop)}).toFile(outputImage)
    .then(function(new_file_info) {
        console.log("Image cropped and saved");
    })
    .catch(function(err) {
        console.log("An error occured");
        console.log(err);
    });
};

async function iterateDetections(imagePath, arr) {
   classLabelList = new Array(LABELS.length).fill(0);
   const image = sharp(imagePath);
   const metadata = await image.metadata();
   const imageHeight = metadata.height
   const imageWidth = metadata.width
   console.log(imageWidth);
   console.log(imageHeight);
    for (i = 0,j = arr.length; i < j; i += 6) {
        temporary = arr.slice(i, i + 6);
        console.log(temporary)
        let classLabel = temporary[0]
        let distanceLeft = temporary[1]
        let distanceTop = temporary[2]
        let scaleWidth = temporary[3]
        let scaleHeight = temporary[4]
        let confidenceScore = temporary[5]
        
        cropImage(image, imageHeight, imageWidth,  `${savedImagesPath}/${LABELS[classLabel]} - ${classLabelList[classLabel]}.jpeg`, distanceLeft- scaleWidth/2, distanceTop - scaleHeight/2, scaleWidth, scaleHeight);
        classLabelList[classLabel] += 1
    }
};

let filename = './AI/yolov5/runs/detect/exp/labels/screenshot.txt'
let arr = []
 fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log('OK: ' + filename);
    arr = data.split(/(\s+)/).filter( e => e.trim().length > 0)
    console.log(arr)
    iterateDetections(imagePath,arr);
  });


  

 
