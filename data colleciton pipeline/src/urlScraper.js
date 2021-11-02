// Run this script to scrape URL's from webistes to initialize the webPageUrls.json file

const axios = require('axios').default;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
var fs = require('fs');
const path = require('path');



//functions to WebScrape Trendyol.com for product URL's
scrapeTrendyol = async (baseSearchUrl, productHrefElementQuery, pi_limit) => {
    try {
        for(let i = 1; i <= pi_limit; i++){
            let searchURL = baseSearchUrl + i;
            const response = await axios.get(searchURL);
            const dom = new JSDOM(response.data);
            const element = dom.window.document.querySelectorAll(productHrefElementQuery);
            //loop through each product element and extract the url of corresponding product's page
            element.forEach(extractUrlTrendyol);
        }
    
    } catch (error) {
      console.error("Something went wrong while scraping Trendyol --> \n\t" + error);
    }
  }

// Given parent div of a element with href to the product, extracts the href from the element
extractUrlTrendyol = (div_element) => {
    let baseURL = "https://www.trendyol.com"
    let relative_href = div_element.children[0].href;
    let finalUrl = baseURL + relative_href;
    trendyolUrls.push(finalUrl);
    count += 1;
}



// -- Call funciton to scrape Trendyol for varios products below -->
let trendyolUrls = []
let count = 0;
// Scrape telefon search from trendyol
let trendyol = async () => {
    // Scrape telefon search from trendyol
    let baseSearchUrl = "https://www.trendyol.com/sr?q=telefon&qt=telefon&st=telefon&os=1&pi=";
    let productHrefElementQuery = "div.srch-prdcts-cntnr  div.p-card-wrppr  div.p-card-chldrn-cntnr";
    let pi_limit= 6;
    await scrapeTrendyol(baseSearchUrl, productHrefElementQuery, pi_limit);
    // Scrape bilgisayar search from trendyol
    baseSearchUrl = "https://www.trendyol.com/sr?q=bilgisayar&qt=bilgisayar&st=bilgisayar&os=1&pi=";
    productHrefElementQuery = "div.srch-prdcts-cntnr  div.p-card-wrppr  div.p-card-chldrn-cntnr";
    pi_limit= 6;
    await scrapeTrendyol(baseSearchUrl, productHrefElementQuery, pi_limit);
    // Scrape dis fircasi search from trendyol
    baseSearchUrl = "https://www.trendyol.com/sr?q=di%C5%9F%20f%C4%B1r%C3%A7as%C4%B1&qt=di%C5%9F%20f%C4%B1r%C3%A7as%C4%B1&st=di%C5%9F%20f%C4%B1r%C3%A7as%C4%B1&os=1&pi=";
    productHrefElementQuery = "div.srch-prdcts-cntnr  div.p-card-wrppr  div.p-card-chldrn-cntnr";
    pi_limit= 6;
    await scrapeTrendyol(baseSearchUrl, productHrefElementQuery, pi_limit);
    // Scrape televizyon search from trendyol
    baseSearchUrl = "https://www.trendyol.com/sr?q=televizyon&qt=televizyon&st=televizyon&os=1&pi=";
    productHrefElementQuery = "div.srch-prdcts-cntnr  div.p-card-wrppr  div.p-card-chldrn-cntnr";
    pi_limit= 6;
    await scrapeTrendyol(baseSearchUrl, productHrefElementQuery, pi_limit);
    // Scrape kulaklık search from trendyol
    baseSearchUrl = "https://www.trendyol.com/sr?q=kulakl%C4%B1k&qt=kulakl%C4%B1k&st=kulakl%C4%B1k&os=1&pi=";
    productHrefElementQuery = "div.srch-prdcts-cntnr  div.p-card-wrppr  div.p-card-chldrn-cntnr";
    pi_limit= 6;
    await scrapeTrendyol(baseSearchUrl, productHrefElementQuery, pi_limit);
    // Scrape mouse search from trendyol
    baseSearchUrl = "https://www.trendyol.com/sr?q=mouse&qt=mouse&st=mouse&os=1&pi=";
    productHrefElementQuery = "div.srch-prdcts-cntnr  div.p-card-wrppr  div.p-card-chldrn-cntnr";
    pi_limit= 6;
    await scrapeTrendyol(baseSearchUrl, productHrefElementQuery, pi_limit);
    // Scrape klavye search from trendyol
    baseSearchUrl = "https://www.trendyol.com/sr?q=klavy&qt=klavy&st=klavy&os=1&pi=";
    productHrefElementQuery = "div.srch-prdcts-cntnr  div.p-card-wrppr  div.p-card-chldrn-cntnr";
    pi_limit= 6;
    await scrapeTrendyol(baseSearchUrl, productHrefElementQuery, pi_limit);

}




// ==============================================================================


//functions to WebScrape n11.com for product URL's
scrapeN11 = async (baseSearchUrl, productHrefElementQuery, pg_limit) => {
    try {
        for(let i = 1; i <= pg_limit; i++){
            let searchURL = baseSearchUrl + i;
            const response = await axios.get(searchURL);
            const dom = new JSDOM(response.data);
            const element = dom.window.document.querySelectorAll(productHrefElementQuery);
            //loop through each product element and extract the url of corresponding product's page
            element.forEach(extractUrlN11);
            //console.log(element[0].children[0].href);
        }
    
    } catch (error) {
      console.error("Something went wrong while scraping n11 --> \n\t" + error);
    }
  }

// Given parent div of a element with href to the product, extracts the href from the element
extractUrlN11 = (div_element) => {
    let finalUrl = div_element.children[0].href;
    n11Urls.push(finalUrl);
    count += 1;
}


// -- Call funciton to scrape n11 for varios products below -->
let n11Urls = []
count = 0
// Scrape telefon search from trendyol
let n11 = async () => {
    // Scrape telefon search from trendyol
    baseSearchUrl = "https://www.n11.com/arama?q=telefon&pg=";
    productHrefElementQuery = "div#view  li div.pro";
    pg_limit= 6;
    await scrapeN11(baseSearchUrl, productHrefElementQuery, pg_limit);
    // Scrape bilgisayar search from trendyol
    baseSearchUrl = "https://www.n11.com/arama?q=bilgisayar&pg=";
    productHrefElementQuery = "div#view  li div.pro";
    pg_limit= 6;
    await scrapeN11(baseSearchUrl, productHrefElementQuery, pg_limit);
    // Scrape dis fircasi search from trendyol
    baseSearchUrl = "https://www.n11.com/arama?q=di%C5%9F+f%C4%B1r%C3%A7as%C4%B1&pg=";
    productHrefElementQuery = "div#view  li div.pro";
    pg_limit= 6;
    await scrapeN11(baseSearchUrl, productHrefElementQuery, pg_limit);
    // Scrape televizyon search from trendyol
    baseSearchUrl = "https://www.n11.com/arama?q=televizyon&pg=";
    productHrefElementQuery = "div#view  li div.pro";
    pg_limit= 6;
    await scrapeN11(baseSearchUrl, productHrefElementQuery, pg_limit);
    // Scrape kulaklık search from trendyol
    baseSearchUrl = "https://www.n11.com/arama?q=kulakl%C4%B1k&pg=";
    productHrefElementQuery = "div#view  li div.pro";
    pg_limit= 6;
    await scrapeN11(baseSearchUrl, productHrefElementQuery, pg_limit);
    // Scrape mouse search from trendyol
    baseSearchUrl = "https://www.n11.com/arama?q=mouse&pg=";
    productHrefElementQuery = "div#view  li div.pro";
    pg_limit= 6;
    await scrapeN11(baseSearchUrl, productHrefElementQuery, pg_limit);
    // Scrape klavye search from trendyol
    baseSearchUrl = "https://www.n11.com/arama?q=klavye&pg=";
    productHrefElementQuery = "div#view  li div.pro";
    pg_limit= 6;
    await scrapeN11(baseSearchUrl, productHrefElementQuery, pg_limit);
}



// ==============================================================================
scrapeReddit = async (baseSearchUrl, productHrefElementQuery) => {
    try {
        let searchURL = baseSearchUrl;
        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        element.forEach(extractUrlReddit);
        console.log(element[0].children[0].children[0].children[0].href);
    
    } catch (error) {
      console.error("Something went wrong while scraping Reddit --> \n\t" + error);
    }
  }

  extractUrlReddit = (div_element) => {
    let baseURL = "https://www.reddit.com"
    let relative_href = div_element.children[0].children[0].children[0].href;
    let finalUrl = baseURL + relative_href;
    redditUrls.push(finalUrl);
    countReddit += 1;
}
let redditUrls = []
countReddit = 0

let reddit = async () => {
    baseSearchUrl = "https://www.reddit.com/search/?q=gaming&type=link&sort=new";
    productHrefElementQuery = "div._1Y6dfr4zLlrygH-FLmr8x-";
    await scrapeReddit(baseSearchUrl, productHrefElementQuery);
}

// ==============================================================================
scrapeDH = async (baseSearchUrl, productHrefElementQuery) => {
    try {
        let searchURL = baseSearchUrl;
        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        element.forEach(extractUrlDH);
        console.log(element[0].children[1].href);
    
    } catch (error) {
      console.error("Something went wrong while scraping donanım haber --> \n\t" + error);
    }
  }

  extractUrlDH = (div_element) => {
    let baseURL = "https://forum.donanimhaber.com/"
    let relative_href = div_element.children[1].href;
    let finalUrl = baseURL + relative_href;
    dhUrls.push(finalUrl);
    countDH += 1;
}
let dhUrls = []
countDH = 0

let dh = async () => {
    baseSearchUrl = "https://forum.donanimhaber.com/";
    productHrefElementQuery = "div.js-popular-hot-topic-row";
    await scrapeDH(baseSearchUrl, productHrefElementQuery);
}
// ==============================================================================





// ______________________________________________________________________________
//  ___________________________________________________________________________

// Saves scraped url's to webPageUrls.json file from the arrays
saveJson = () => {
    // created object to be saved into the file
    json_obj = {
        "webPageUrls": {
            "trendyol": trendyolUrls,
            "n11": n11Urls,
            "dh": dhUrls,
            "reddit": redditUrls,

        }
    }

    // Create a folder to save the .json file
    var dir = '../resources';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    // save the obj into the file
    dir = '../resources';
    obj_path = path.join(dir, 'webPageUrls.json');

    json_obj_string = JSON.stringify(json_obj);
    fs.writeFile (obj_path, json_obj_string, (err) => {
        if (err) throw err;
    });
}


call_script = async() => {
    //call functions to web scrape the web pages below
    console.log('+Starting to scrape trendyol.com ...')
    await trendyol();
    console.log('-Scraping trendyol.com finished. ' + trendyolUrls.length + ' URL\'s were successfully scraped.')
    console.log('+Starting to scrape n11.com ...')
    await n11();
    console.log('-Scraping n11.com finished. ' + n11Urls.length + ' URL\'s were successfully scraped.')
    console.log('+Starting to scrape donanımhaber.com ...')
    await dh();
    console.log('-Scraping donanımhaber.com finished. ' + dhUrls.length + ' URL\'s were successfully scraped.')
    console.log('+Starting to scrape reddit.com ...')
    await reddit();
    console.log('-Scraping reddit.com finished. ' + redditUrls.length + ' URL\'s were successfully scraped.')
    console.log('* Starting to save scraped url\'s into "resources/WebPageUrls.json" file ...')
    saveJson();
    console.log("*Successfully saved.")

}

call_script();