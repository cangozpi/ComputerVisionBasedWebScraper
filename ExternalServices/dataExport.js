const fs = require('fs');
const { exit } = require('process');

const imageFolder = './DataScraper/images/';
const ocrFolder = './OCR/OCR_output/';
var args = process.argv.slice(2);
let siteType = args[0]



switch (siteType) {
    case 'shopping-site':
        let jsonTemplate = {
            title: null,
            seller: null,
            ratings: null,
            price: null,
            reviews: null,
            product_info: null,
            product_specs: null,
            main_photo: null,
            options: null,
            summary: null,
            product_desc: null
        }
        populateJSON(jsonTemplate);
        break;
    case 'forum-site':
        break;
    case 'news-site':
        break;
    default:
        console.log("siteType does not exist.[DataExport.js]");

}
exit()

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}

async function populateJSON(jsonTemplate) {
    try {
        files = fs.readdirSync(imageFolder);
            files.forEach(function (file) {
                if (!file.includes("review")) {
                    jsonTemplate[file.slice(0, -5)] = base64_encode(imageFolder + file);
                } 
            });

            fs.writeFileSync('data.json', JSON.stringify(jsonTemplate));
    } catch (err) {
        console.error('Error occured while reading directory!', err);
    }
 
    try {
        files = fs.readdirSync(ocrFolder);
        reviews = []
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            var ocr = fs.readFileSync(ocrFolder + file, { encoding: 'utf8', flag: 'r' });
            if (file.includes("review")) {
                reviews.push(ocr)
            } else {
                jsonTemplate[file.slice(0, -4)] = ocr
            }
        });
        if (siteType === "shopping-site") jsonTemplate["reviews"] = reviews
        fs.writeFileSync("data.json", JSON.stringify(jsonTemplate))
        console.log("data.json created.")
    } catch (err) {
        console.error('Error occured while reading directory!', err);
    }
}
