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
    currentUrl = "https://www.trendyol.com/apple/iphone-xr-64gb-product-red-cep-telefonu-apple-turkiye-garantili-aksesuarsiz-kutu-p-65178103?boutiqueId=583350&merchantId=384386";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(5*60*1000);
    // visit currentUrl's page
    await page.goto(currentUrl);
    //extract the segments of interest from the webpage as DOM elements
    
    //title : name of the product
    title_element = await (await page.$(".pr-new-br span")).boundingBox()
    console.log(title_element)
    //seller : name of the seller/store
    seller_element = await (await page.$(".merchant-box-wrapper a")).boundingBox()
    console.log(seller_element)
    //ratings : star and number of reviews 
    ratings_element = await (await page.$(".pr-in-rnr")).boundingBox()
    console.log(ratings_element)
    //price : price of the product
    price_element = await (await page.$(".pr-bx-pr-dsc")).boundingBox()
    console.log(price_element)
    //review : singular review
    reviews = await (await page.$$(".rnr-com-w"))
    review_elements = []
    for(let i = 0; i < reviews.length; i++){
        review_elements.push((await reviews[i].boundingBox()))
    }
    console.log(review_elements)
    //reviews_button : button to open up reviews or load more reviews
    reviews_button_element = await (await page.$(".pr-rnr-mr-btn.gnr-cnt-br")).boundingBox()
    console.log(reviews_button_element)
    //details_button : button that opens up detailed info about the product
    details_button_element = await (await page.$(".button-all-features")).boundingBox()
    console.log(details_button_element)
    //search_box : search box/bar at the top of the page
    search_box_element = await (await page.$("input.search-box")).boundingBox()
    console.log(search_box_element)
    //question : if present, questions that users asked to the seller
    questions = await (await page.$$(".qna-item"))
    question_elements = []
    for(let i = 0; i < questions.length; i++){
        question_elements.push((await questions[i].boundingBox()))
    }
    console.log(question_elements)
    //questions_button : button to open up or load more questions
    questions_button_element = await (await page.$("a.more-questions")).boundingBox()
    console.log(questions_button_element)
    //product_info : detailed product info not the short version
    product_info_element = await (await page.$(".featured-information")).boundingBox()
    console.log(product_info_element)
    //product_specs : specs sheet/table of the product
    product_specs_element = await (await page.$(".detail-border")).boundingBox()
    console.log(product_specs_element)
    //photo : other photos of the product
    photo_element = await (await page.$(".gallery-container")).boundingBox()
    console.log(photo_element)
    //selected_photo : small icon of the selected photo
    selected_photo_element = await (await page.$(".detail-section-img")).boundingBox()
    console.log(selected_photo_element)
    //main_photo : big image of the product
    main_photo_element = await (await page.$(".gallery-container")).boundingBox()
    console.log(main_photo_element)
    //options : different options for the product 
    options_element = await (await page.$(".slicing-attributes")).boundingBox()
    console.log(options_element)
    //summary . product summary
    summary_element = await (await page.$(".starred-attributes")).boundingBox()
    console.log(summary_element)
    //product_desc : extended description of the product if available
    product_desc_element = await (await page.$(".product-desc")).boundingBox()
    console.log(product_desc_element)

    
    // extract the coordinates of the elements

    // make a map of element-coordinates mappings

    //generate text for the current page's images *label.txt file

    //save the segment screenshots and their corresponding *label.txt file




       /*
    e = await (await page.$(".base-product-image img")).boundingBox()
    console.log(e)
    const divCount = await page.$eval('.base-product-image img', (product_image) => {
        return product_image.width}
        );
    console.log(divCount) 
    */

/*
      await page.screenshot({ 
      path: dir,
      type: 'jpeg',
      fullPage: true
 });
  */
    await browser.close();
  })();





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

