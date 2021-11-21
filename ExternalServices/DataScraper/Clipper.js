const sharp = require('sharp');

// original image
let imagePath = '../Screenshot/screenshot.jpeg';

// file name for cropped image
let outputImage = 'croppedImage.jpg';




async function cropImage(imagePath, scaleLeft, scaleTop, scaleWidth, scaleHeight) {
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    const imageHeight = metadata.height
    const imageWidth = metadata.width
    console.log(imageWidth);
    console.log(imageHeight);

//batu = [0.6, 0.2, 0.1, 0.1]
image.extract({ width: Math.round(imageWidth * scaleWidth), height: Math.round(imageHeight * scaleHeight), left: Math.round(imageWidth * scaleLeft), top: Math.round(imageHeight * scaleTop)}).toFile(outputImage)
    .then(function(new_file_info) {
        console.log("Image cropped and saved");
    })
    .catch(function(err) {
        console.log("An error occured");
        console.log(err);
    });
};

 cropImage(imagePath, 0.6, 0.2, 0.8, 0.1);
