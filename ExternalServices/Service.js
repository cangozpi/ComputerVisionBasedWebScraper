const execSync = require('child_process').execSync;

const path = require('path');

var args = process.argv.slice(2);
console.log(args[0])
let siteUrl = args[0]
let siteType = args[1]

//./Screenshot/ScreenShot.js
//./Screenshot/ScreenShot

//Screenshot
execSync(`node  ./Screenshot/ScreenShot.js "${siteUrl}"`,{stdio: 'inherit'});

//Python yolov5 Script
execSync(`py ./AI/yolov5/detect.py --weights ./AI/${siteType}.pt --img 1251 --conf 0.25 --source ./DataScraper/screenshot.jpeg --save-txt --save-conf --nosave `);

//Clipper
execSync(`node ./DataScraper/Clipper.js`,{stdio: 'inherit'});
