// Sciprt to download labelled data from the web in yolov5 data format.

// yolov5 text: class_label center_x center_y bouding_box_width/total_image_width bounding_box_height/total_image_width

/* 
Shopping Sites:
  Follow the example labelled images.
  Following class names are used as labels. 
  Label other recommended products as product, do not label the price, title, seller etc.
  Classes:
    title : name of the product
    seller : name of the seller/store
    ratings : star and number of reviews 
    price : price of the product
    review : singular review
    reviews_button : button to open up reviews or load more reviews
    details_button : button that opens up detailed info about the product,
    search_box : search box/bar at the top of the page
    question : if present, questions that users asked to the seller 
    questions_button : button to open up or load more questions
    product_info : detailed product info not the short version
    product_specs : specs sheet/table of the product
    photo : other photos of the product
    selected_photo : small icon of the selected photo
    main_photo : big image of the product
    cookie_popup : the entire cookie popup
    cookie_accept : accept button of the cookie popup incase navigation is needed
    cookie_close : close button of the cookie popup incase navigation is needed
    options : different options for the product 
    summary . product summary
    product_desc : extended description of the product if available
    */

//====================================================================================


const webPageUrls = require("../data collection pipeline/resources/webPageUrls.json").webPageUrls;

// extract the scraped url's for trendyol
trendyolUrls = webPageUrls.trendyol;


const puppeteer = require('puppeteer');
// open the corresponding web pages
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Configure the navigation timeout
    await page.setDefaultNavigationTimeout(5*60*1000);

    await page.goto('https://example.com');
      await page.screenshot({ 
      path: dir,
      type: 'jpeg',
      fullPage: true
 });
  
    await browser.close();
  })();

//extract the segments of interest from the webpage as DOM elements

//take screenshots of the segments of interests

//save the segment screenshots and their corresponding *label.txt file




/*
const puppeteer = require('puppeteer');

// Take a screen shot from a webpage
process.setMaxListeners(0);

// Function that saves a screenshot of the page at url into the directory dir
takeScreenshot = async (url, dir) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Configure the navigation timeout
  await page.setDefaultNavigationTimeout(5*60*1000);
  await page.goto(url);
  await page.screenshot({ 
    path: dir,
    type: 'jpeg',
    fullPage: true
    });
await browser.close();
};
*/

