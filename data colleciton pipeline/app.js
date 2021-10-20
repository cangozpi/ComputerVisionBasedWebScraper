// For now run this short script to see if your installations are compatible.

var fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');

// Create a folder to install scraped images from the web
var dir = './websiteScreenshots';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}


// Take a screen shot from a webpage
// -- TODO: can't take a screenshot of the web page using puppeteer with the script below. Fix it.

// Function that saves a screenshot of the page at url into the directory dir
takeScreenshot = async (url, dir) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: dir });
  await browser.close();
};


const webPageUrls = require("./resources/webPageUrls.json").webPageUrls;

(takeScreenshots = (webPageUrls, dir) => {
    for(let i = 0; i < webPageUrls.length; i++){
        current_path = path.join(dir, i.toString() + '.png');
        current_url = webPageUrls[i]
        takeScreenshot(current_url, current_path)  
        
        console.log('* Saving screenshot from webpage: ' + current_url + ".\n")  
    }
})(webPageUrls, dir);

console.log('Script succesfully run.\nFind downloaded images at ' + dir + ".\n");
