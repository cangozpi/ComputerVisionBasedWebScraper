var fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');

// Create a folder to install scraped images from the web
var dir = './websiteScreenshots';
// add extension to the chrome
//https://chrome.google.com/webstore/detail/i-dont-care-about-cookies/fihnjjcciajhdojfnbdddfaoknhalnja
// change the below const to your extensions directory.
const dontcarecookies = 'C:\\Users\\vasilis\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\laankejkbhbdhmipfmgcngdelahlfoji\\1.6.0_0';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}


// Take a screen shot from a webpage
process.setMaxListeners(0);

// Function that saves a screenshot of the page at url into the directory dir
takeScreenshot = async (url, dir) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${dontcarecookies}`, 
      `--load-extension=${dontcarecookies}`,
      '--enable-automation'
    ]
  } );
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


//TODO: can change webPageUrls.length to something smaller such as 5 to execute code faster for 
//development purposes. It should stay as webPageUrls.length on launch to iterate ~5k of al all the available url's

const webPageUrls = require("./resources/webPageUrls.json").webPageUrls;
takeScreenshots = async (webPageUrls, dir, pageName) => {
    //TODO: comment the line below and uncomment the line that is two lines below when you want to download only 5 screenshots instead off all ~5k !
    for(let i = 0; i < webPageUrls.length; i++){
    //for(let i = 0; i < 5; i++){
        current_path = path.join(dir, pageName + '-' + i.toString() + '.jpeg');
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
    takeScreenshots(webPageUrls.trendyol, dir, 'trendyol');
    takeScreenshots(webPageUrls.n11, dir, 'n11');
    takeScreenshots(webPageUrls.eksisozluk, dir, 'eksi');
    takeScreenshots(webPageUrls.dh, dir, 'donanimHaber');
    await takeScreenshots(webPageUrls.sozcu, dir, 'sozcu');

    console.log('Script succesfully run.\nFind downloaded images at ' + dir + ".\n");
}

call_script();