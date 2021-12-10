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
const shopping_extracted_elements_labels = ["title", "seller", "ratings", "price", "review", "reviews_button", "details_button", "search_box", 
"question", "questions_button", "product_info", "product_specs", "photo", "selected_photo", "main_photo", "options",
"summary", "product_desc"]

const puppeteer = require('puppeteer');
// open the corresponding web pages
//replace 1 with trendyolUrls.length in production
for(let k=0; k < 10; k++){
    (async () => {
        currentUrl = trendyolUrls[k];
        //navigate to page
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(5*60*1000);
        // visit currentUrl's page
        await page.goto(currentUrl);
        //extract the coordinates of the DOM elements of interest from the given url
        extracted_elements_array = []
        extracted_elements_labels = shopping_extracted_elements_labels;
        //title : name of the product
        title_element = await page.$(".pr-new-br span")
        if(title_element != null){
            title_element = await title_element.boundingBox()
            extracted_elements_array.push(title_element)
            //console.log(title_element)
        }
        //seller : name of the seller/store
        seller_element = await page.$(".merchant-box-wrapper a")
        if(seller_element != null){
            seller_element = await seller_element.boundingBox()
            extracted_elements_array.push(seller_element)
            //console.log(seller_element)
        }
        //ratings : star and number of reviews
        ratings_element = await page.$(".pr-in-rnr")
        if(ratings_element != null){
            ratings_element = await ratings_element.boundingBox()
            extracted_elements_array.push(ratings_element)
            //console.log(ratings_element)
        }
        //price : price of the product
        price_element = await page.$(".prc-slg")
        if(price_element != null){
            price_element = await price_element.boundingBox()
            extracted_elements_array.push(price_element)
            //console.log(price_element)
        }
        //review : singular review
        reviews = await (await page.$$(".rnr-com-w"))
        review_elements = []
        for(let i = 0; i < reviews.length; i++){
            review_elements.push((await reviews[i].boundingBox()))
        }
        if(review_elements.length > 0){
            extracted_elements_array.push(review_elements)
        }
        //reviews_button : button to open up reviews or load more reviews
        reviews_button_element = await page.$(".pr-rnr-mr-btn.gnr-cnt-br")
        if(reviews_button_element != null){
            reviews_button_element = await reviews_button_element.boundingBox()
            extracted_elements_array.push(reviews_button_element)
            //console.log(reviews_button_element)
        }
        //details_button : button that opens up detailed info about the product
        details_button_element = await page.$(".button-all-features")
        if(details_button_element != null){
            details_button_element = await details_button_element.boundingBox()
            extracted_elements_array.push(details_button_element)
            //console.log(details_button_element)
        }
        //search_box : search box/bar at the top of the page
        search_box_element = await page.$("input.search-box")
        if(search_box_element != null){
            search_box_element = await search_box_element.boundingBox()
            extracted_elements_array.push(search_box_element)
            //console.log(search_box_element)
        }
        //question : if present, questions that users asked to the seller
        questions = await (await page.$$(".qna-item"))
        question_elements = []
        for(let i = 0; i < questions.length; i++){
            question_elements.push((await questions[i].boundingBox()))
        }
        if(question_elements.length > 0){
            extracted_elements_array.push(question_elements)
        }
        //questions_button : button to open up or load more questions
        questions_button_element = await page.$("a.more-questions")
        if(questions_button_element != null){
            questions_button_element = await questions_button_element.boundingBox()
            extracted_elements_array.push(questions_button_element)
            //console.log(questions_button_element)
        }
        //product_info : detailed product info not the short version
        product_info_element = await page.$(".featured-information")
        if(product_info_element != null){
            product_info_element = await product_info_element.boundingBox()
            extracted_elements_array.push(product_info_element)
            //console.log(product_info_element)
        }
        //product_specs : specs sheet/table of the product
        product_specs_element = await page.$(".detail-border")
        if(product_specs_element != null){
            product_specs_element = await product_specs_element.boundingBox()
            extracted_elements_array.push(product_specs_element)
            //console.log(product_specs_element)
        }
        //photo : other photos of the product
        photo_element = await page.$(".gallery-container")
        if(photo_element != null){
            photo_element = await photo_element.boundingBox()
            extracted_elements_array.push(photo_element)
            //console.log(photo_element)
        }
        //selected_photo : small icon of the selected photo
        selected_photo_element = await page.$(".detail-section-img")
        if(selected_photo_element != null){
            selected_photo_element = await selected_photo_element.boundingBox()
            extracted_elements_array.push(selected_photo_element)
            //console.log(selected_photo_element)
        }
        //main_photo : big image of the product
        main_photo_element = await page.$(".gallery-container")
        if(main_photo_element != null){
            main_photo_element = await main_photo_element.boundingBox()
            extracted_elements_array.push(main_photo_element)
            //console.log(main_photo_element)
        }
        //options : different options for the product 
        options_element = await page.$(".slicing-attributes")
        if(options_element != null){
            options_element = await options_element.boundingBox()
            extracted_elements_array.push(options_element)
            //console.log(options_element)
        }
        //summary . product summary
        summary_element = await page.$(".starred-attributes")
        if(summary_element != null){
            summary_element = await summary_element.boundingBox()
            extracted_elements_array.push(summary_element)
            //console.log(summary_element)
        }
        //product_desc : extended description of the product if available
        product_desc_element = await page.$(".product-desc")
        if(product_desc_element != null){
            product_desc_element = await product_desc_element.boundingBox()
            extracted_elements_array.push(product_desc_element)
            //console.log(product_desc_element)
        }
        

    
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
    
        //save the segment screenshots and their corresponding *label.txt file
        //create folder to save to
        const fs = require('fs');
        const path = require('path');
    
        const data_dir = './data'
        const train_dir = './data/train';
        const train_img_dir = './data/train/img';
        const train_label_dir = './data/train/label';
    
        if (!fs.existsSync(data_dir)){
            fs.mkdirSync(data_dir);
        }

        
        if (!fs.existsSync(train_dir)){
            fs.mkdirSync(train_dir);
        }

        if (!fs.existsSync(train_img_dir)){
            fs.mkdirSync(train_img_dir);
        }

        if (!fs.existsSync(train_label_dir)){
            fs.mkdirSync(train_label_dir);
        }
    
        // save *label.txt into data_dir
        const uuid = `trendyol label${k}`;
        obj_path = path.join(train_label_dir, uuid + '.txt');
    
        fs.writeFile (obj_path, label_str, (err) => {
            if (err) throw err;
        });
    
        //save screenshot of the current page and save with corresponding name
        img_path = path.join(train_img_dir, uuid + '.jpeg');

        await page.screenshot({ 
            path: img_path,
            type: 'jpeg',
            fullPage: true
       });

        await browser.close();
      })();
}




//create data.yaml file required for yolov5
//create data.yaml string 
const train_img_dir = './data/train/img';
let shopping_labels = "[";
for(let i=0; i < shopping_extracted_elements_labels.length; i++){
    shopping_labels += `'${shopping_extracted_elements_labels[i]}'`
    if(i != shopping_extracted_elements_labels.length-1){
        shopping_labels += ", ";
    }else{
        shopping_labels += "]";
    }
}
yaml_str = `train: ${train_img_dir}\nval: ${train_img_dir}\nnc: ${shopping_extracted_elements_labels.length}\nnames: ${shopping_labels}`
//create folder to save to
const fs = require('fs');
const path = require('path');

const data_dir = './data'

if (!fs.existsSync(data_dir)){
    fs.mkdirSync(data_dir);
}

obj_path = path.join(data_dir, 'data.yaml');
    
fs.writeFile (obj_path, yaml_str, (err) => {
    if (err) throw err;
});