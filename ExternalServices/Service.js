const execSync = require('child_process').execSync;
const fsExtra = require('fs-extra')
const path = require('path');
const fs = require('fs')

var args = process.argv.slice(2);
console.log(args[0])
let siteUrl = args[0]
let siteType = args[1]

//Delete old files

fsExtra.emptyDirSync("./OCR/OCR_output")
fsExtra.emptyDirSync("./DataScraper/images")

try {
    fs.unlinkSync("./AI/yolov5/runs/detect/exp/labels/screenshot.txt")
    fs.unlinkSync("./OCR/merged_text.txt")
    //file removed
  } catch(err) {
    console.error(err)
  }

//Screenshot
execSync(`node  ./Screenshot/ScreenShot.js "${siteUrl}"`,{stdio: 'inherit'});

//Python yolov5 Script
execSync(`py ./AI/yolov5/detect.py --weights ./AI/${siteType}.pt --img 1251 --conf 0.25 --source ./DataScraper/screenshot.jpeg --save-txt --save-conf --nosave `);

//Clipper
execSync(`node ./DataScraper/Clipper.js ${siteType}`,{stdio: 'inherit'});

//OCR
execSync(`node ./OCR/dataExtraction.js`,{stdio: 'inherit'});
