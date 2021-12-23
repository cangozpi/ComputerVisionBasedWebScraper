const fs = require('fs');
const { exit } = require('process');
const fsPromises = fs.promises;
const util = require('util');

const readdir = util.promisify(fs.readdir);
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
    let = a;
    try {
         a = await readdir(imageFolder, function (err, files) {
            console.log(jsonTemplate);

            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }

            //listing all files using forEach
            files.forEach(function (file) {

                // Do whatever you want to do with the file
                jsonTemplate[file.slice(0, -5)] = base64_encode(imageFolder + file);
            });

            let jsonData = JSON.stringify(jsonTemplate);
            fs.writeFileSync('data.json', jsonData);
            return jsonTemplate;
        });
    } catch (err) {
        console.error('Error occured while reading directory!', err);
    }
   /* fs.readdir(ocrFolder, function (err, files) {

        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }


        fs.readFile('data.json', function (err, dat) {
            var json = {}
            json.images = JSON.parse(dat)
            reviews = []
            revbol = false
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                if (file.includes("review")) {
                    var ocr = fs.readFileSync(ocrFolder + file, { encoding: 'utf8', flag: 'r' });
                    reviews.push({ [file.slice(0, -4)]: ocr })
                    revbol = true
                } else {
                    var ocr = fs.readFileSync(ocrFolder + file, { encoding: 'utf8', flag: 'r' });
                    jsonTemplate[file.slice(0, -4)] = ocr
                }

            });
            if (siteType === "shopping-site") jsonTemplate["reviews"] = reviews

            json.ocr_output = data
            fs.writeFileSync("data.json", JSON.stringify(json))

        })
    });*/

}
