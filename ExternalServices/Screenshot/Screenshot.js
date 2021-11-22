// For now run this short script to see if your installations are compatible.

var fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');

// Create a folder to install scraped images from the web
var dir = './';

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
  await page.setDefaultNavigationTimeout(5*60*1000);

  await page.goto(url);
  if (url.includes("eksi")){
  const [button] = await page.$x("//button[contains(., 'tüm çerezleri kabul et')]");
    if (button) {
        await button.click();
    }
}
  await page.screenshot({ 
      path: dir,
      type: 'jpeg',
      fullPage: true
 });
  await browser.close();
};


take = async(url) =>{
        try{
            await takeScreenshot(url, path.join(dir, 'screenshot.jpeg')); 
        }catch(err){
            console.log(err)
        }  
        console.log('* Saving screenshot from webpage: ' + url + ".\n");
}
var args = process.argv.slice(2);
console.log(args[0])
take(args[0]);  


