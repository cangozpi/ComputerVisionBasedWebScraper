// Sciprt to download labelled data from the web in yolov5 data format.

// yolov5 text: class_label center_x center_y bouding_box_width/total_image_width bounding_box_height/total_image_width

/*
yolov5 data format:
Each image has one txt file with a single line for each bounding box. The format of each row is
            class_id center_x center_y width height
where fields are space delimited, and the coordinates are normalized from zero to one.
Note: To convert to normalized xywh from pixel values, divide x (and width) by the image's width and divide y (and height) by the image's height.
*/

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
    //navigate to page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(5*60*1000);
    // visit currentUrl's page
    await page.goto(currentUrl);
    //extract the coordinates of the DOM elements of interest from the given url
    extracted_elements_array = []
    extracted_elements_labels = ["title", "seller", "ratings", "price", "review", "reviews_button", "details_button", "search_box", 
    "question", "questions_button", "product_info", "product_specs", "photo", "selected_photo", "main_photo", "options",
    "summary", "product_desc"]
    //title : name of the product
    title_element = await (await page.$(".pr-new-br span")).boundingBox()
    extracted_elements_array.push(title_element)
    //console.log(title_element)
    //seller : name of the seller/store
    seller_element = await (await page.$(".merchant-box-wrapper a")).boundingBox()
    extracted_elements_array.push(seller_element)
    //console.log(seller_element)
    //ratings : star and number of reviews 
    ratings_element = await (await page.$(".pr-in-rnr")).boundingBox()
    extracted_elements_array.push(ratings_element)
    //console.log(ratings_element)
    //price : price of the product
    price_element = await (await page.$(".pr-bx-pr-dsc")).boundingBox()
    extracted_elements_array.push(price_element)
    //console.log(price_element)
    //review : singular review
    reviews = await (await page.$$(".rnr-com-w"))
    review_elements = []
    for(let i = 0; i < reviews.length; i++){
        review_elements.push((await reviews[i].boundingBox()))
    }
    extracted_elements_array.push(review_elements)
    //console.log(review_elements)
    //reviews_button : button to open up reviews or load more reviews
    reviews_button_element = await (await page.$(".pr-rnr-mr-btn.gnr-cnt-br")).boundingBox()
    extracted_elements_array.push(reviews_button_element)
    //console.log(reviews_button_element)
    //details_button : button that opens up detailed info about the product
    details_button_element = await (await page.$(".button-all-features")).boundingBox()
    extracted_elements_array.push(details_button_element)
    //console.log(details_button_element)
    //search_box : search box/bar at the top of the page
    search_box_element = await (await page.$("input.search-box")).boundingBox()
    extracted_elements_array.push(search_box_element)
    //console.log(search_box_element)
    //question : if present, questions that users asked to the seller
    questions = await (await page.$$(".qna-item"))
    question_elements = []
    for(let i = 0; i < questions.length; i++){
        question_elements.push((await questions[i].boundingBox()))
    }
    extracted_elements_array.push(question_elements)
    //console.log(question_elements)
    //questions_button : button to open up or load more questions
    questions_button_element = await (await page.$("a.more-questions")).boundingBox()
    extracted_elements_array.push(questions_button_element)
    //console.log(questions_button_element)
    //product_info : detailed product info not the short version
    product_info_element = await (await page.$(".featured-information")).boundingBox()
    extracted_elements_array.push(product_info_element)
    //console.log(product_info_element)
    //product_specs : specs sheet/table of the product
    product_specs_element = await (await page.$(".detail-border")).boundingBox()
    extracted_elements_array.push(product_specs_element)
    //console.log(product_specs_element)
    //photo : other photos of the product
    photo_element = await (await page.$(".gallery-container")).boundingBox()
    extracted_elements_array.push(photo_element)
    //console.log(photo_element)
    //selected_photo : small icon of the selected photo
    selected_photo_element = await (await page.$(".detail-section-img")).boundingBox()
    extracted_elements_array.push(selected_photo_element)
    //console.log(selected_photo_element)
    //main_photo : big image of the product
    main_photo_element = await (await page.$(".gallery-container")).boundingBox()
    extracted_elements_array.push(main_photo_element)
    //console.log(main_photo_element)
    //options : different options for the product 
    options_element = await (await page.$(".slicing-attributes")).boundingBox()
    extracted_elements_array.push(options_element)
    //console.log(options_element)
    //summary . product summary
    summary_element = await (await page.$(".starred-attributes")).boundingBox()
    extracted_elements_array.push(summary_element)
    //console.log(summary_element)
    //product_desc : extended description of the product if available
    product_desc_element = await (await page.$(".product-desc")).boundingBox()
    extracted_elements_array.push(product_desc_element)
    //console.log(product_desc_element)



    // make a map of element-(coordinate/info) mappings
    info_template = { //boiler plate code
        class_id: null,
        center_x: null,
        center_y: null,
        width: null,
        height: null
    }
    
    //extract page's height and width for normalizing bounding box coordinates
    body_element = await (await page.$(".gallery-container")).boundingBox()
    const page_height = body_element.height;
    const page_width = body_element.width

    
    // work with extracted information
    str_row_infos = [] //each entry corresponds to an information that forms a row of the label.txt file
    for(let i=0; i < extracted_elements_array.length; i++){
        current_label = extracted_elements_labels[i]
        current_element = extracted_elements_array[i]
        
        // check if current element is a list of elements or not
        if (current_element.length > 1){ // element list
            //iterate through element list to get each element
            for(let j=0; j<current_element.length; j++){
                cur_el = current_element[j]

                info_template.class_id = i
                info_template.center_x = cur_el.x/page_width //normalize the x value
                info_template.center_y = cur_el.y/page_height //normalize the y value
                info_template.width = cur_el.width
                info_template.height = cur_el.height
                
                var info_template_copy = JSON.parse(JSON.stringify(info_template)); //clone the object
                
                str_row_infos.push(info_template_copy)
            }
        }else{ //single element
            info_template.class_id = i
            info_template.center_x = current_element.x/page_width //normalize the x value
            info_template.center_y = current_element.y/page_height //normalize the y value
            info_template.width = current_element.width
            info_template.height = current_element.height

            var info_template_copy = JSON.parse(JSON.stringify(info_template)); //clone the object
            
            str_row_infos.push(info_template_copy)
        }
        
    }

    //generate text for the current page's images *label.txt file
    label_str = "";
    for(let i=0; i<str_row_infos.length; i++){
        current_row_info = str_row_infos[i]

        if((current_row_info.class_id != null) & (current_row_info.center_x != null) & 
        (current_row_info.center_y != null) & (current_row_info.width != null) & (current_row_info.height != null)){
            current_str = `${current_row_info.class_id} ${current_row_info.center_x} ${current_row_info.center_y} ${current_row_info.width} ${current_row_info.height}`
            label_str += current_str;
            if(i != str_row_infos-1){
                label_str +="\n";
            }
        }
    }
    
    console.log(label_str)

    //save the segment screenshots and their corresponding *label.txt file along with corresponding data.yaml




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

