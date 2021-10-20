// Run this script to scrape URL's from webistes to initialize the webPageUrls.json file

const axios = require('axios').default;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


//functions to WebScrape Trenyol.com for product URL's
scrapeTrendyol = async (baseSearchUrl, productHrefElementQuery, pi_limit) => {
    try {
        for(let i = 1; i <= pi_limit; i++){
            let searchURL = baseSearchUrl + i;
            const response = await axios.get(searchURL);
            const dom = new JSDOM(response.data);
            const element = dom.window.document.querySelectorAll(productHrefElementQuery);
            //loop through each product element and extract the url of corresponding product's page
            element.forEach(extractUrl);
            //console.log(element[0].children[0].href);
        }
    
    } catch (error) {
      console.error("Something went wrong while scraping Trendyol --> \n\t" + error);
    }
  }

// Given parent div of a element with href to the product, extracts the href from the element
extractUrl = async (div_element) => {
    let baseURL = "https://www.trendyol.com"
    let relative_href = div_element.children[0].href;
    let finalUrl = baseURL + relative_href;
    trendyolUrls.push(finalUrl)
    count += 1
}



// -- Call funciton to scrape Trendyol for varios products below -->
let trendyolUrls = []
let count = 0
// Scrape telefon search from trendyol
let trendyol = async () => {
    let baseSearchUrl = "https://www.trendyol.com/sr?q=telefon&qt=telefon&st=telefon&os=1&pi=";
    let productHrefElementQuery = "div.srch-prdcts-cntnr  div.p-card-wrppr  div.p-card-chldrn-cntnr";
    let pi_limit= 6
    
    scrapeTrendyol(baseSearchUrl, productHrefElementQuery, pi_limit);
    // Scrape bilgisayar search from trendyol
    baseSearchUrl = "https://www.trendyol.com/sr?q=bilgisayar&qt=bilgisayar&st=bilgisayar&os=1&pi=";
    productHrefElementQuery = "div.srch-prdcts-cntnr  div.p-card-wrppr  div.p-card-chldrn-cntnr";
    pi_limit= 6
    scrapeTrendyol(baseSearchUrl, productHrefElementQuery, pi_limit);
    // Scrape dis fircasi search from trendyol
    baseSearchUrl = "https://www.trendyol.com/sr?q=di%C5%9F%20f%C4%B1r%C3%A7as%C4%B1&qt=di%C5%9F%20f%C4%B1r%C3%A7as%C4%B1&st=di%C5%9F%20f%C4%B1r%C3%A7as%C4%B1&os=1&pi=";
    productHrefElementQuery = "div.srch-prdcts-cntnr  div.p-card-wrppr  div.p-card-chldrn-cntnr";
    pi_limit= 6
    scrapeTrendyol(baseSearchUrl, productHrefElementQuery, pi_limit);
    // Scrape televizyon search from trendyol
    baseSearchUrl = "https://www.trendyol.com/sr?q=televizyon&qt=televizyon&st=televizyon&os=1&pi=";
    productHrefElementQuery = "div.srch-prdcts-cntnr  div.p-card-wrppr  div.p-card-chldrn-cntnr";
    pi_limit= 6
    scrapeTrendyol(baseSearchUrl, productHrefElementQuery, pi_limit);
    // Scrape kulaklık search from trendyol
    baseSearchUrl = "https://www.trendyol.com/sr?q=kulakl%C4%B1k&qt=kulakl%C4%B1k&st=kulakl%C4%B1k&os=1&pi=";
    productHrefElementQuery = "div.srch-prdcts-cntnr  div.p-card-wrppr  div.p-card-chldrn-cntnr";
    pi_limit= 6
    scrapeTrendyol(baseSearchUrl, productHrefElementQuery, pi_limit);
    // Scrape mouse search from trendyol
    baseSearchUrl = "https://www.trendyol.com/sr?q=mouse&qt=mouse&st=mouse&os=1&pi=";
    productHrefElementQuery = "div.srch-prdcts-cntnr  div.p-card-wrppr  div.p-card-chldrn-cntnr";
    pi_limit= 6
    scrapeTrendyol(baseSearchUrl, productHrefElementQuery, pi_limit);
    // Scrape klavye search from trendyol
    baseSearchUrl = "https://www.trendyol.com/sr?q=klavy&qt=klavy&st=klavy&os=1&pi=";
    productHrefElementQuery = "div.srch-prdcts-cntnr  div.p-card-wrppr  div.p-card-chldrn-cntnr";
    pi_limit= 6
    scrapeTrendyol(baseSearchUrl, productHrefElementQuery, pi_limit);

}

trendyol()



// ==============================================================================















// Web Scrape Hepsiburada.com
// Below are for hepsiburada but they blocked web scraping
// let baseSearchUrl = "https://www.hepsiburada.com/ara?q=telefon&sayfa=1";
// let productHrefElementQuery = "li.productListContainer-item > a";
