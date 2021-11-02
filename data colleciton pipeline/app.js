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
process.setMaxListeners(0);

// Function that saves a screenshot of the page at url into the directory dir
takeScreenshot = async (url, dir) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Configure the navigation timeout
  await page.setDefaultNavigationTimeout(0);

  await page.goto(url);
  await page.screenshot({ 
      path: dir,
      fullPage: true
 });
  await browser.close();
};


//TODO: can change webPageUrls.length to something smaller such as 5 to execute code faster for 
//development purposes. It should stay as webPageUrls.length on launch to iterate ~5k of al all the available url's

const webPageUrls = require("./resources/webPageUrls.json").webPageUrls;
takeScreenshots = (webPageUrls, dir, pageName) => {
    //TODO: uncomment the line below and comment the line that is two lines below when you want to download all of the screenshots!
    //for(let i = 0; i < webPageUrls.length; i++){
    for(let i = 0; i < 5; i++){
        current_path = path.join(dir, pageName + '-' + i.toString() + '.png');
        current_url = webPageUrls[i]
        takeScreenshot(current_url, current_path)  
        
        console.log('* Saving screenshot from webpage: ' + current_url + ".\n")  
    }
}

takeScreenshots(webPageUrls.trendyol, dir, 'trendyol');
takeScreenshots(webPageUrls.n11, dir, 'n11');
takeScreenshots(webPageUrls.reddit, dir, 'reddit');
takeScreenshots(webPageUrls.dh, dir, 'donanimHaber');
takeScreenshots(webPageUrls.sozcu, dir, 'sozcu');


console.log('Script succesfully run.\nFind downloaded images at ' + dir + ".\n");
