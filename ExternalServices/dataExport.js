const fs = require('fs');
const { exit } = require('process');

const imageFolder = './DataScraper/images/';
const ocrFolder = './OCR/OCR_output/';
var args = process.argv.slice(2);
let siteType = args[0]
let jsonTemplate = {}


switch (siteType) {
    case 'shopping-site':
        jsonTemplate = {
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
        break;
    case 'forum-site':
        jsonTemplate = {
            main_topic: null,
            main_post: null,
            post_owner: null,
            date_info: null,
            forum_category: null,
            data: null
        }
        break;
    case 'news-site':
        jsonTemplate = {
            main_topic: null,
            main_post: null,
            post_owner: null,
            date_info: null,
            forum_category: null,
            main_text: null
        }
        break;
    default:
        console.log("siteType does not exist.[DataExport.js]");

}
populateJSON(jsonTemplate);

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
                jsonTemplate[file.slice(0, -5)] = base64_encode(imageFolder + file); 
            });

            fs.writeFileSync('data.json', JSON.stringify(jsonTemplate));
    } catch (err) {
        console.error('Error occured while reading directory!', err);
    }
 
    try {
        files = fs.readdirSync(ocrFolder);
        reviews = []
        answers = []
        owners = []
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            var ocr = fs.readFileSync(ocrFolder + file, { encoding: 'utf8', flag: 'r' });
            if (file.includes("review")) {
                reviews.push(ocr)
            }else if(file.includes("answer")){
                if(file.includes("answer_owner")){
                    owners.push(ocr)
                }else answers.push(ocr)
            } else {
                jsonTemplate[file.slice(0, -4)] = ocr
            }
        });
        if (siteType === "shopping-site") jsonTemplate["reviews"] = reviews
        
        if(siteType === "forum-site"){
            let data = []
            for( i in answers){
                if(owners.length<=i)owner.push(null)
                data.push({"answer_owner":owners[i], "answer" : answers[i]})
            }
            jsonTemplate["data"] = data
        }
        fs.writeFileSync("data.json", JSON.stringify(jsonTemplate))
        console.log("data.json created.")
    } catch (err) {
        console.error('Error occured while reading directory!', err);
    }
}
