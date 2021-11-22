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

let eksiUrls = []
let eksi = async () => {
    
    let baseURL = "https://www.eksisozluk.com/entry/"
    for(let i = 0; i < 1000; i++){
        t = i+129720000
        finalUrl = baseURL+t
        eksiUrls.push(finalUrl);
    }
}

// =============================================================================//
// -- Call funcitons below to scrape donanimHaber -->
scrapeDH = async (baseSearchUrl, productHrefElementQuery,pg_limit) => {
    try {
        for(let i = 2; i <= pg_limit; i++){
        let searchURL = baseSearchUrl+i;
        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        element.forEach(extractUrlDH);
        }
    } catch (error) {
      console.error("Something went wrong while scraping donanım haber --> \n\t" + error);
    }
  }

  extractUrlDH = (div_element) => {
    let baseURL = "https://forum.donanimhaber.com/"
    let relative_href = div_element.children[1].children[0].href;
    let finalUrl = baseURL + relative_href;
    dhUrls.push(finalUrl);
    countDH += 1;
}
let dhUrls = []
countDH = 0

let dh = async () => {
    baseSearchUrl = "https://forum.donanimhaber.com/apple-iphone-ipad--f462?sayfa=";
    productHrefElementQuery = "div.kl-icerik-satir.yenikonu";
    await scrapeDH(baseSearchUrl, productHrefElementQuery,15);
}
// ==============================================================================




//functions to WebScrape sozcu for news url's -->
scrapeSozcu = async (searchURL, productHrefElementQuery) => {
    try {
        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        //loop through each product element and extract the url of corresponding product's page
        element.forEach(extractUrlSozcu);
    
    } catch (error) {
      console.error("Something went wrong while scraping Sozcu --> \n\t" + error);
    }
  }

// Given parent div of a element with href to the product, extracts the href from the element
extractUrlSozcu = (div_element) => {
    let extracted_href = div_element.children[0].href;
    sozcuUrls.push(extracted_href);
    count += 1;
}



// -- Call funciton to scrape Trendyol for varios products below -->
let sozcuUrls = []
count = 0;

let sozcu = async () => {
    // Scrape gundem topcics from sozcu
    const page_limit = 30 // number of pages to scrape for url's
    for(let i=1; i < page_limit; i ++){
        let baseSearchUrl = "https://www.sozcu.com.tr/kategori/gundem/" + i;//loop through pages btw [1, page_limit]
        let productHrefElementQuery = "div.news-item";
        await scrapeSozcu(baseSearchUrl, productHrefElementQuery);    
    }
}


// ==============================================================================

//functions to WebScrape aydınlık for news url's -->
scrapeAydınlık = async (searchURL, productHrefElementQuery) => {
    try {
        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        //loop through each product element and extract the url of corresponding product's page
        element.forEach(extractUrlAydınlık);

    } catch (error) {
      console.error("Something went wrong while scraping Aydınlık --> \n\t" + error);
    }
  }

// Given parent div of a element with href to the product, extracts the href from the element
extractUrlAydınlık = (div_element) => {
    let extracted_href = div_element.children[0].href;
    aydınlıkUrls.push(extracted_href);
    count += 1;
}



// -- Call funciton to scrape Trendyol for varios products below -->
let aydınlıkUrls = []
count = 0;

let aydınlık = async () => {
    // Scrape gundem topcics from aydınlık
    const page_limit = 30 // number of pages to scrape for url's
    for(let i=1; i < page_limit; i ++){
        let baseSearchUrl = "https://www.aydinlik.com.tr/tum-haberler" + i;//loop through pages btw [1, page_limit]
        let productHrefElementQuery = "mat-list-item.mat-list-item mat-multi-line ng-star-inserted";
        await scrapeAydınlık(baseSearchUrl, productHrefElementQuery);
    }
}
// ==============================================================================

//functions to WebScrape Korkusuz for news url's -->
scrapeKorkusuz = async (searchURL, productHrefElementQuery) => {
    try {
        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        //loop through each product element and extract the url of corresponding product's page
        element.forEach(extractUrlKorkusuz);

    } catch (error) {
      console.error("Something went wrong while scraping Korkusuz --> \n\t" + error);
    }
  }

// Given parent div of a element with href to the product, extracts the href from the element
extractUrlKorkusuz = (div_element) => {
    let extracted_href = div_element.children[0].href;
    korkusuzUrls.push(extracted_href);
    count += 1;
}



// -- Call funciton to scrape Trendyol for varios products below -->
let korkusuzUrls = []
count = 0;

let korkusuz = async () => {
    // Scrape gundem topcics from korkusuz
    const page_limit = 30 // number of pages to scrape for url's
    for(let i=1; i < page_limit; i ++){
        let baseSearchUrl = "https://www.korkusuz.com.tr/gundem/" + i;//loop through pages btw [1, page_limit]
        let productHrefElementQuery = "div.post";
        await scrapeKorkusuz(baseSearchUrl, productHrefElementQuery);
    }
}
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
            "eksisozluk": eksiUrls,
            "sozcu": sozcuUrls
            "korkusuz": korkusuzUrls
            "aydınlık": aydınlıkUrls
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
    console.log('+Starting to scrape eksisozluk.com ...')
    await eksi();
    console.log('-Scraping eksisozluk.com finished. ' + eksiUrls.length + ' URL\'s were successfully scraped.')
    console.log('* Starting to save scraped url\'s into "resources/WebPageUrls.json" file ...')
    await sozcu();
    console.log('-Scraping sozcu.com.tr finished. ' + sozcuUrls.length + ' URL\'s were successfully scraped.')
    console.log('* Starting to save scraped url\'s into "resources/WebPageUrls.json" file ...')
     console.log('-Scraping https://www.aydinlik.com.tr finished. ' + aydınlıkUrls.length + ' URL\'s were successfully scraped.')
     console.log('* Starting to save scraped url\'s into "resources/WebPageUrls.json" file ...')
     console.log('-Scraping https://www.korkusuz.com.tr/ finished. ' + korkusuzUrls.length + ' URL\'s were successfully scraped.')
     console.log('* Starting to save scraped url\'s into "resources/WebPageUrls.json" file ...')
    saveJson();
    console.log("*Successfully saved.")

}

call_script();