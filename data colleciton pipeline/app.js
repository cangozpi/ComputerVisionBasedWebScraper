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
  if (url.includes("eksi")){
  const [button] = await page.$x("//button[contains(., 'tüm çerezleri kabul et')]");
    if (button) {
        await button.click();
    }
}
  await page.screenshot({ 
      path: dir,
      fullPage: true
 });
  await browser.close();
};


//TODO: can change webPageUrls.length to something smaller such as 5 to execute code faster for 
//development purposes. It should stay as webPageUrls.length on launch to iterate ~5k of al all the available url's

const webPageUrls = require("./resources/webPageUrls.json").webPageUrls;
takeScreenshots = async (webPageUrls, dir, pageName) => {
    //TODO: comment the line below and uncomment the line that is two lines below when you want to download only 5 screenshots instead off all ~5k !
    //for(let i = 0; i < webPageUrls.length; i++){
    for(let i = 0; i < 5; i++){
        current_path = path.join(dir, pageName + '-' + i.toString() + '.png');
        current_url = webPageUrls[i]
        try{
            await takeScreenshot(current_url, current_path); 
        }catch(err){
            console.log(err)
        }
        
        console.log('* Saving screenshot from webpage: ' + current_url + ".\n")  
    }
}

call_script = async() => {
    await takeScreenshots(webPageUrls.trendyol, dir, 'trendyol');
    await takeScreenshots(webPageUrls.n11, dir, 'n11');
    await takeScreenshots(webPageUrls.eksisozluk, dir, 'eksi');
    await takeScreenshots(webPageUrls.dh, dir, 'donanimHaber');
    await takeScreenshots(webPageUrls.sozcu, dir, 'sozcu');

    console.log('Script succesfully run.\nFind downloaded images at ' + dir + ".\n");
}

call_script();