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

News Sites:
    title : title of the news article
    writer : writer of the news article
    date_info : date and time info of when the article was released
    subtitle : subtitle
    main_text : main paragraphs of the article
    main_text_titles : titles betweeen the paragraphs
    photo : photos in the articles
  

Forum Sites:
    main_topic : title of the post
    main_post : the main post excluding title
    post_owner : writer of the main post
    date_info : date and time info of when the post was posted
    answer : answer to the post
    answer_owner : writer of the answer
    forum_category : which category the post was posted
   
    
    
    
    
    
    */

//====================================================================================


const webPageUrls = require("../data collection pipeline/resources/webPageUrls.json").webPageUrls;

// extract the scraped url's for trendyol
trendyolUrls = webPageUrls.trendyol;
n11Urls = webPageUrls.n11;
dhUrls = webPageUrls.dh;
eksisozlukUrls = webPageUrls.eksisozluk;
sozcuUrls = webPageUrls.sozcu;
postaUrls = webPageUrls.posta;
cumhuriyetUrls = webPageUrls.cumhuriyet;
amazonUrls = webPageUrls.amazon;
hepsiburadaUrls = webPageUrls.hepsiburada;
teknopatUrls = webPageUrls.teknopat;
shiftdeleteUrls = webPageUrls.shiftdelete;
chipUrls = webPageUrls.chip;
hurriyetUrls = webPageUrls.hurriyet;
yenisafakUrls = webPageUrls.yenisafak;
sahibindenUrls = webPageUrls.sahibinden;

const shopping_extracted_elements_labels = ["title", "seller", "ratings", "price", "review", "reviews_button", "details_button", "search_box", 
"question", "questions_button", "product_info", "product_specs", "photo", "selected_photo", "main_photo", "options",
"summary", "product_desc"]

const news_extracted_elements_labels = [ "title", "search_box","photo", "date_info","writer","subtitle",
           "main_text","main_text_titles"] 

const forum_extracted_elements_labels = ["search_box", "date_info","post_owner",
           "main_topic","main_post","answer","answer_owner","forum_category"]


const data_dir = './data'
const site_dir =  data_dir + "/trendyol"
const image_dir = site_dir + "/image"
const label_dir = site_dir + "/label"
    
const puppeteer = require('puppeteer');

var shopping_html_elements = []
var forum_html_elements = []
var news_html_elements = []

var shopping = false
var forum = false
var news = false


const trendyol_html_elements = [".pr-new-br span",".merchant-box-wrapper a",".pr-in-rnr",".prc-slg",".rnr-com-w"
                               ".pr-rnr-mr-btn.gnr-cnt-br",".button-all-features","input.search-box",".qna-item",
                               "a.more-questions",".featured-information",".detail-border",".gallery-container",
                               ".detail-section-img",
                                ".gallery-container",".slicing-attributes",".starred-attributes",".product-desc"]
const n11_html_elements = []
const amazon_html_elements = []
const hepsiburada_html_elements = []
const sahibinden_html_elements = []


const dh_html_elements = []
const eksisozluk_html_elements = []
const teknopat_html_elements = []
const shiftdelete_html_elements = []
const chip_html_elements = []

const sozcu_html_elements = []
const posta_html_elements = []
const cumhuriyet_html_elements = []
const hurriyet_html_elements = []
const yenisafak_html_elements = []





// open the corresponding web pages
//replace 1 with trendyolUrls.length in production
(async () => {
        
    //navigate to page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(5*60*1000);
        
    switch(site_dir):
        case data_dir + "/trendyol":
            shopping = true;
            currentUrls = 
            shopping_html_elements = trendyol_html_elements;
            break;
        case data_dir + "/n11":
            shopping = true;
            shopping_html_elements = n11_html_elements;
            break;
        case data_dir + "/amazon":
            shopping = true;
            shopping_html_elements = amazon_html_elements;
            break;
        case data_dir + "/hepsiburada":
            shopping = true;
            shopping_html_elements = hepsiburada_html_elements;
            break;
        case data_dir + "/sahibinden":
            shopping = true;
            shopping_html_elements = sahibinden_html_elements;
            break;
        case data_dir + "/dh":
            forum = true;
            forum_html_elements = dh_html_elements;
            break;
        case data_dir + "/eksisozluk":
            forum = true;
            forum_html_elements = eksisozluk_html_elements;
            break;
        case data_dir + "/teknopat":
            forum = true;
            forum_html_elements = teknopat_html_elements;
            break;
        case data_dir + "/shiftdelete":
            forum = true;
            forum_html_elements = shiftdelete_html_elements;
            break;
        case data_dir + "/chip":
            forum = true;
            forum_html_elements = chip_html_elements;
            break;
        case data_dir + "/sozcu":
            news = true;
            news_html_elements = sozcu_html_elements;
            break;
        case data_dir + "/posta":
            news = true;
            news_html_elements = posta_html_elements;
            break;
        case data_dir + "/cumhuriyet":
            news = true;
            news_html_elements = cumhuriyet_html_elements;
            break;
        case data_dir + "/hurriyet":
            news = true;
            news_html_elements = hurriyet_html_elements;
            break;
        case data_dir + "/yenisafak":
            news = true;
            news_html_elements = yenisafak_html_elements;
            break;
       
    
    
    
    
    
    for(let k=0; k < 96; k++){
        currentUrl = currentUrls[k];
        // visit currentUrl's page
        await page.goto(currentUrl);
        //extract the coordinates of the DOM elements of interest from the given url
        extracted_elements_array = []
        extracted_elements_labels_ordered = []
        
        
        if(shopping) {
            extracted_elements_labels = shopping_extracted_elements_labels;
            //title : name of the product
            title_element = await page.$(shopping_html_elements[0])
            if(title_element != null){
                title_element = await title_element.boundingBox()
                extracted_elements_array.push(title_element)
                extracted_elements_labels_ordered.push(0)
                //console.log(title_element)
            }
            //seller : name of the seller/store
            seller_element = await page.$(shopping_html_elements[1])
            if(seller_element != null){
                seller_element = await seller_element.boundingBox()
                extracted_elements_array.push(seller_element)
                extracted_elements_labels_ordered.push(1)
                //console.log(seller_element)
            }
            //ratings : star and number of reviews
            ratings_element = await page.$(shopping_html_elements[2])
            if(ratings_element != null){
                ratings_element = await ratings_element.boundingBox()
                extracted_elements_array.push(ratings_element)
                extracted_elements_labels_ordered.push(2)
                //console.log(ratings_element)
            }
            //price : price of the product
            price_element = await page.$(shopping_html_elements[3])
            if(price_element != null){
                price_element = await price_element.boundingBox()
                extracted_elements_array.push(price_element)
                extracted_elements_labels_ordered.push(3)
                //console.log(price_element)
            }
            //review : singular review
            reviews = await (await page.$$(shopping_html_elements[4]))
            review_elements = []
            for(let i = 0; i < reviews.length; i++){
                review_elements.push((await reviews[i].boundingBox()))
            }
            if(review_elements.length > 0){
                extracted_elements_array.push(review_elements)
                extracted_elements_labels_ordered.push(4)
            }
            //reviews_button : button to open up reviews or load more reviews
            reviews_button_element = await page.$(shopping_html_elements[5])
            if(reviews_button_element != null){
                reviews_button_element = await reviews_button_element.boundingBox()
                extracted_elements_array.push(reviews_button_element)
                extracted_elements_labels_ordered.push(5)
                //console.log(reviews_button_element)
            }
            //details_button : button that opens up detailed info about the product
            details_button_element = await page.$(shopping_html_elements[6])
            if(details_button_element != null){
                details_button_element = await details_button_element.boundingBox()
                extracted_elements_array.push(details_button_element)
                extracted_elements_labels_ordered.push(6)
                //console.log(details_button_element)
            }
            //search_box : search box/bar at the top of the page
            search_box_element = await page.$(shopping_html_elements[7])
            if(search_box_element != null){
                search_box_element = await search_box_element.boundingBox()
                extracted_elements_array.push(search_box_element)
                extracted_elements_labels_ordered.push(7)
                //console.log(search_box_element)
            }
            //question : if present, questions that users asked to the seller
            questions = await (await page.$$(shopping_html_elements[8]))
            question_elements = []
            for(let i = 0; i < questions.length; i++){
                question_elements.push((await questions[i].boundingBox()))
            }
            if(question_elements.length > 0){
                extracted_elements_array.push(question_elements)
                extracted_elements_labels_ordered.push(8)
            }
            //questions_button : button to open up or load more questions
            questions_button_element = await page.$(shopping_html_elements[9])
            if(questions_button_element != null){
                questions_button_element = await questions_button_element.boundingBox()
                extracted_elements_array.push(questions_button_element)
                extracted_elements_labels_ordered.push(9)
                //console.log(questions_button_element)
            }
            //product_info : detailed product info not the short version
            product_info_element = await page.$(shopping_html_elements[10])
            if(product_info_element != null){
                product_info_element = await product_info_element.boundingBox()
                extracted_elements_array.push(product_info_element)
                extracted_elements_labels_ordered.push(10)
                //console.log(product_info_element)
            }
            //product_specs : specs sheet/table of the product
            product_specs_element = await page.$(shopping_html_elements[11])
            if(product_specs_element != null){
                product_specs_element = await product_specs_element.boundingBox()
                extracted_elements_array.push(product_specs_element)
                extracted_elements_labels_ordered.push(11)
                //console.log(product_specs_element)
            }
            //photo : other photos of the product
            photo_element = await page.$(shopping_html_elements[12])
            if(photo_element != null){
                photo_element = await photo_element.boundingBox()
                extracted_elements_array.push(photo_element)
                extracted_elements_labels_ordered.push(12)
                //console.log(photo_element)
            }
            //selected_photo : small icon of the selected photo
            selected_photo_element = await page.$(shopping_html_elements[13])
            if(selected_photo_element != null){
                selected_photo_element = await selected_photo_element.boundingBox()
                extracted_elements_array.push(selected_photo_element)
                extracted_elements_labels_ordered.push(13)
                //console.log(selected_photo_element)
            }
            //main_photo : big image of the product
            main_photo_element = await page.$(shopping_html_elements[14])
            if(main_photo_element != null){
                main_photo_element = await main_photo_element.boundingBox()
                extracted_elements_array.push(main_photo_element)
                extracted_elements_labels_ordered.push(14)
                //console.log(main_photo_element)
            }
            //options : different options for the product 
            options_element = await page.$(shopping_html_elements[15])
            if(options_element != null){
                options_element = await options_element.boundingBox()
                extracted_elements_array.push(options_element)
                extracted_elements_labels_ordered.push(15)
                //console.log(options_element)
            }
            //summary . product summary
            summary_element = await page.$(shopping_html_elements[16])
            if(summary_element != null){
                summary_element = await summary_element.boundingBox()
                extracted_elements_array.push(summary_element)
                extracted_elements_labels_ordered.push(16)
                //console.log(summary_element)
            }
            //product_desc : extended description of the product if available
            product_desc_element = await page.$(shopping_html_elements[17])
            if(product_desc_element != null){
                product_desc_element = await product_desc_element.boundingBox()
                extracted_elements_array.push(product_desc_element)
                extracted_elements_labels_ordered.push(17)
                //console.log(product_desc_element)
            }
            
        //FORUM    
            
        }else if(forum){
            extracted_elements_labels = forum_extracted_elements_labels;
            //search box : search box
            search_box_element = await page.$(forum_html_elements[0])
            if(search_box_element != null){
                search_box_element = await search_box_element.boundingBox()
                extracted_elements_array.push(search_box_element)
                extracted_elements_labels_ordered.push(0)
                //console.log(search_box_element)
            }
            //date info : date / time of post
            date_info_element = await page.$(forum_html_elements[1])
            if(ratings_element != null){
                date_info_element = await date_info_element.boundingBox()
                extracted_elements_array.push(date_info_element)
                extracted_elements_labels_ordered.push(1)
                //console.log(date_info_element)
            }
            //post owner : owner of the post
            post_owner_element = await page.$(forum_html_elements[2])
            if(post_owner_element != null){
                post_owner_element = await post_owner_element.boundingBox()
                extracted_elements_array.push(post_owner_element)
                extracted_elements_labels_ordered.push(2)
                //console.log(post_owner_element)
            }
            //main_topic : title of the post
            main_topic_element = await page.$(forum_html_elements[3])
            if(main_topic_element != null){
                main_topic_element = await main_topic_element.boundingBox()
                extracted_elements_array.push(main_topic_element)
                extracted_elements_labels_ordered.push(3)
                //console.log(main_topic_element)
            }
            //main_post : main post body
            main_post_element = await page.$(forum_html_elements[4])
            if(main_post_element != null){
                main_post_element = await main_post_element.boundingBox()
                extracted_elements_array.push(main_post_element)
                extracted_elements_labels_ordered.push(4)
                //console.log(main_post_element)
            }
            // answers : answer posts to the main post
            answers = await (await page.$$(forum_html_elements[5]))
            answer_elements = []
            for(let i = 0; i < reviews.length; i++){
                answer_elements.push((await answers[i].boundingBox()))
            }
            if(answer_elements.length > 0){
                extracted_elements_array.push(answer_elements)
                extracted_elements_labels_ordered.push(5)
            }
            // answer_owners : owners of the answer posts to the main post
            answer_owners = await (await page.$$(forum_html_elements[6]))
            answer_owner_elements = []
            for(let i = 0; i < answer_owners.length; i++){
                answer_owner_elements.push((await answer_owners[i].boundingBox()))
            }
            if(answer_owner_elements.length > 0){
                extracted_elements_array.push(answer_owner_elements)
                extracted_elements_labels_ordered.push(6)
            }
            //forum_category : forum category that the post belongs to
            forum_category_element = await page.$(forum_html_elements[7])
            if(forum_category_element != null){
                forum_category_element = await forum_category_element.boundingBox()
                extracted_elements_array.push(forum_category_element)
                extracted_elements_labels_ordered.push(7)
                //console.log(forum_category_element)
            }
        }else if(news){
            extracted_elements_labels = news_extracted_elements_labels;
            //title : title of the news
            title_element = await page.$(news_html_elements[0])
            if(title_element != null){
                title_element = await title_element.boundingBox()
                extracted_elements_array.push(title_element)
                extracted_elements_labels_ordered.push(0)
                //console.log(title_element)
            }
            //search box : search box
            search_box_element = await page.$(news_html_elements[1])
            if(search_box_element != null){
                search_box_element = await search_box_element.boundingBox()
                extracted_elements_array.push(search_box_element)
                extracted_elements_labels_ordered.push(1)
                //console.log(search_box_element)
            }
            // photos : photos in the article
            photos = await (await page.$$(news_html_elements[2]))
            photo_elements = []
            for(let i = 0; i < photos.length; i++){
                photo_elements.push((await photos[i].boundingBox()))
            }
            if(photo_elements.length > 0){
                extracted_elements_array.push(photo_elements)
                extracted_elements_labels_ordered.push(2)
            }
            //date info : date / time of post
            date_info_element = await page.$(news_html_elements[3])
            if(ratings_element != null){
                date_info_element = await date_info_element.boundingBox()
                extracted_elements_array.push(date_info_element)
                extracted_elements_labels_ordered.push(3)
                //console.log(date_info_element)
            }
            //writer : writer of the article
            writer_element = await page.$(news_html_elements[4])
            if(writer_element != null){
                writer_element = await writer_element.boundingBox()
                extracted_elements_array.push(writer_element)
                extracted_elements_labels_ordered.push(4)
                //console.log(writer_element)
            }
            //subtitle : subtitle of the article
            subtitle_element = await page.$(news_html_elements[5])
            if(subtitle_element != null){
                subtitle_element = await subtitle_element.boundingBox()
                extracted_elements_array.push(subtitle_element)
                extracted_elements_labels_ordered.push(5)
                //console.log(subtitle_element)
            }
            // main_text : paragraphs of the main text
            main_texts = await (await page.$$(news_html_elements[6]))
            main_text_elements = []
            for(let i = 0; i < main_texts.length; i++){
                main_text_elements.push((await main_texts[i].boundingBox()))
            }
            if(main_text_elements.length > 0){
                extracted_elements_array.push(main_text_elements)
                extracted_elements_labels_ordered.push(6)
            }
            // main_text_titles : titles between the paragraphs of the main text
            main_text_titles = await (await page.$$(news_html_elements[7]))
            main_text_title_elements = []
            for(let i = 0; i < main_text_titles.length; i++){
                main_text_title_elements.push((await main_text_titles[i].boundingBox()))
            }
            if(main_text_title_elements.length > 0){
                extracted_elements_array.push(main_text_title_elements)
                extracted_elements_labels_ordered.push(7)
            }
        }    
            
        

    
        // make a map of element-(coordinate/info) mappings
        info_template = { //boilerplate code
            class_id: null,
            center_x: null,
            center_y: null,
            width: null,
            height: null
        }
        
        //extract page's height and width for normalizing bounding box coordinates
        
        //body_element = await (await page.$(".container")).boundingBox()
        //const page_height = body_element.height;
        //const page_width = body_element.width      
        //console.log(page_width)
        //console.log(page_height)
        //const page_height = page.viewport().height
        //const page_width = page.viewport().width
        
        // work with extracted information
        str_row_infos = [] //each entry corresponds to an information that forms a row of the label.txt file
        for(let i=0; i < extracted_elements_array.length; i++){
            current_label = extracted_elements_labels_ordered[i]
            current_element = extracted_elements_array[i]
            
            // check if current element is a list of elements or not
            if (current_element.length > 1){ // element list
                //iterate through element list to get each element
                for(let j=0; j<current_element.length; j++){
                    cur_el = current_element[j]
    
                    info_template.class_id = current_label
                    
                    //info_template.center_x = cur_el.x/page_width //normalize the x value
                    //info_template.center_y = cur_el.y/page_height //normalize the y value
                    //info_template.width = cur_el.width/page_width //normalize
                    //info_template.height = cur_el.height/page_height //normalize
                    
                    info_template.center_x = cur_el.x + cur_el.width/2
                    info_template.center_y = cur_el.y + cur_el.height/2
                    info_template.width = cur_el.width
                    info_template.height = cur_el.height
                    
                    var info_template_copy = JSON.parse(JSON.stringify(info_template)); //clone the object
                    
                    str_row_infos.push(info_template_copy)
                }
            }
            
            
            else{ //single element
                info_template.class_id = current_label
                
                //info_template.center_x = current_element.x/page_width //normalize the x value
                //info_template.center_y = current_element.y/page_height //normalize the y value
                //info_template.width = current_element.width/page_width //normalize
                //info_template.height = current_element.height/page_height //normalize
                
                info_template.center_x = current_element.x + current_element.width/2
                info_template.center_y = current_element.y + current_element.height/2
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
        
        if (!fs.existsSync(data_dir)){
            fs.mkdirSync(data_dir);
        }

        
        if (!fs.existsSync(site_dir)){
            fs.mkdirSync(site_dir);
        }

        if (!fs.existsSync(image_dir)){
            fs.mkdirSync(image_dir);
        }

        if (!fs.existsSync(label_dir)){
            fs.mkdirSync(label_dir);
        }
    
        // save *label.txt into data_dir
        const uuid = `trendyol label${k}`;
        obj_path = path.join(label_dir, uuid + '.txt');
    
        fs.writeFile (obj_path, label_str, (err) => {
            if (err) throw err;
        });
    
        //save screenshot of the current page and save with corresponding name
        img_path = path.join(image_dir, uuid + '.jpeg');

        await page.screenshot({ 
            path: img_path,
            type: 'jpeg',
            fullPage: true
       });

        
      }
    await browser.close();
})();
