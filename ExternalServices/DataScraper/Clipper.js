const sharp = require('sharp');
var fs = require('fs')

// original image
let imagePath = './DataScraper/screenshot.jpeg';
let savedImagesPath = './DataScraper/images'
//Labels
Labels = [
    ['title', 'seller', 'ratings', 'price', 'review', 'reviews_button', 'details_button', 'search_box', 'question', 'questions_button','product_info', 'product_specs', 'photo', 'selected_photo', 'main_photo', 'cookie_popup', 'cookie_accept', 'cookie_close', 'options', 'summary','product_desc'],
    ["title", "search_box", "date_info","post_owner", "main_topic","main_post","answer","answer_owner","forum_category"],
    ["title", "search_box","photo","cookie_popup", "cookie_accept", "date_info","writer","subtitle", "main_text","main_text_titles"]
]


var args = process.argv.slice(2);
console.log(args[0])
let siteTypeStr = args[0]
let siteType = -1
if (siteTypeStr.includes("shopping")){
    siteType = 0
}else if(siteTypeStr.includes("forum")){
    siteType = 1
}else if(siteTypeStr.includes("news")){
    siteType = 2
}


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

async function iterateDetections(imagePath, arr, siteTypeNum) {
   classLabelList = new Array(Labels[siteTypeNum].length).fill(0);
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
        if ((siteType == 0 && ((classLabel == 4) || (classLabel == 8) || (classLabel == 12))) || (siteType == 2 && ((classLabel == 8) || (classLabel == 9)))){
            cropImage(image, imageHeight, imageWidth,  `${savedImagesPath}/${Labels[siteTypeNum][classLabel]} - ${classLabelList[classLabel]}.jpeg`, distanceLeft- scaleWidth/2, distanceTop - scaleHeight/2, scaleWidth, scaleHeight);
        } else {
            let scores = []
            for (t = 0,k = arr.length; t < k; t += 6) {
                temporary_scores = arr.slice(t, t + 6);
                if (temporary_scores[0] == classLabel){
                    scores.push(temporary_scores[5])
                }
            }
            if (confidenceScore == Math.max.apply(Math, scores)){
                cropImage(image, imageHeight, imageWidth,  `${savedImagesPath}/${Labels[siteTypeNum][classLabel]}.jpeg`, distanceLeft- scaleWidth/2, distanceTop - scaleHeight/2, scaleWidth, scaleHeight);
            }
        }
        //photo, review ve question hariç bir tane
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
    console.log(siteType)
    iterateDetections(imagePath, arr, siteType);
  });

