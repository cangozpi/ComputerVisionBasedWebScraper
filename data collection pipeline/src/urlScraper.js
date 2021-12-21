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
      console.error("Something went wrong while scraping donanim haber --> \n\t" + error);
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
scrapeCumhuriyet = async (searchURL, productHrefElementQuery) => {
    try {
        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        //loop through each product element and extract the url of corresponding product's page
        element.forEach(extractUrlCumhuriyet);

    } catch (error) {
      console.error("Something went wrong while scraping Cumhuriyet --> \n\t" + error);
    }
  }


// Given parent div of a element with href to the product, extracts the href from the element
extractUrlCumhuriyet = (div_element) => {
    let baseURl = 'https://www.cumhuriyet.com.tr'
    let extracted_href = div_element.children[0].href;
    cumhuriyetUrls.push(baseURl+extracted_href);
    count += 1;
}



// -- Call funciton to scrape Trendyol for varios products below -->
let cumhuriyetUrls = []

let cumhuriyet = async () => {
    // Scrape gundem topcics from aydınlık
    //const page_limit = 30 // number of pages to scrape for url's
    for(let i of ["gundem","ekonomi","dunya","yasam","spor","siyaset","bilim-teknoloji","cumhuriyet-cumartesi","kitap","cumhuriyetin-egesi","cumhuriyet-pazar","kultur-sanat","koronavirus"]){
        let baseSearchUrl = "https://www.cumhuriyet.com.tr/"+i;//loop through pages btw [1, page_limit]
        let productHrefElementQuery = "div.haber-baslik";
        await scrapeCumhuriyet(baseSearchUrl, productHrefElementQuery);
    }
}
// ==============================================================================

//functions to WebScrape Korkusuz for news url's -->
scrapePosta = async (searchURL, productHrefElementQuery) => {
    try {
        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        //loop through each product element and extract the url of corresponding product's page
        element.forEach(extractUrlPosta);

    } catch (error) {
      console.error("Something went wrong while scraping Korkusuz --> \n\t" + error);
    }
  }

// Given parent div of a element with href to the product, extracts the href from the element
extractUrlPosta = (div_element) => {
    let baseURl = 'https://www.posta.com.tr'
    let extracted_href = div_element.children[0].href;
    postaUrls.push(baseURl+extracted_href);
}



// -- Call funciton to scrape Trendyol for varios products below -->
let postaUrls = []
count = 0;

let posta = async () => {
    // Scrape gundem topcics from korkusuz
    const page_limit = 30 // number of pages to scrape for url's
    for(let i of ["gundem","ekonomi","magazin","sosyal-yasam","gundem/siyaset","spor","gundem/turkiye","dunya"]){
        let baseSearchUrl = "https://www.posta.com.tr/"+i;//loop through pages btw [1, page_limit]
        let productHrefElementQuery = "div.newsbox.newsbox--has-icon";
        await scrapePosta(baseSearchUrl, productHrefElementQuery);
    }
}


// ==============================================================================

//functions to WebScrape Korkusuz for news url's -->
scrapeAmazon = async (searchURL, productHrefElementQuery) => {
    try {
        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        //loop through each product element and extract the url of corresponding product's page
        element.forEach(extractUrlAmazon);

    } catch (error) {
      console.error("Something went wrong while scraping Amazon --> \n\t" + error);
    }
  }

// Given parent div of a element with href to the product, extracts the href from the element
extractUrlAmazon = (div_element) => {
    let baseURl = 'https://www.amazon.com.tr'
    let extracted_href = div_element.children[1].children[0].href;
    amazonUrls.push(baseURl+extracted_href);
}



// -- Call funciton to scrape Amazon for varios products below -->
let amazonUrls = []
count = 0;

let amazon = async () => {
    // Scrape gundem topcics from korkusuz
    for(let i of ["iphone","macbook","playstation","xbox","asus","nvidia"]){
        let baseSearchUrl = "https://www.amazon.com.tr/s?k="+i;//loop through pages btw [1, page_limit]
        let productHrefElementQuery = "div.a-section.a-spacing-medium";
        await scrapeAmazon(baseSearchUrl, productHrefElementQuery);
    }
}
// ==============================================================================

//functions to WebScrape Korkusuz for news url's -->
scrapehepsiburada = async (searchURL, productHrefElementQuery) => {
    try {
        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        //loop through each product element and extract the url of corresponding product's page
        element.forEach(extractUrlhepsiburada);

    } catch (error) {
      console.error("Something went wrong while scraping Hepsiburada --> \n\t" + error);
    }
  }

// Given parent div of a element with href to the product, extracts the href from the element
extractUrlhepsiburada = (div_element) => {
    let baseURl = 'https://www.hepsiburada.com'
    let extracted_href = div_element.children[0].href;
    hepsiburadaUrls.push(baseURl+extracted_href);
}



// -- Call funciton to scrape Amazon for varios products below -->
let hepsiburadaUrls = []
count = 0;

let hepsiburada = async () => {
    // Scrape gundem topcics from korkusuz
    for(let i of ["iphone","ipad","watch","kulaklik","monitor","televizyon","macbook","playstation","xbox","asus","nvidia"]){
        let baseSearchUrl = "https://www.hepsiburada.com/ara?q="+i;//loop through pages btw [1, page_limit]
        let productHrefElementQuery = "div.moria-ProductCard-joawUM";
        await scrapehepsiburada(baseSearchUrl, productHrefElementQuery);
    }
}

// ==============================================================================

//functions to WebScrape Korkusuz for news url's -->
scrapeshiftdelete = async (searchURL, productHrefElementQuery) => {
    try {
        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        //loop through each product element and extract the url of corresponding product's page
        element.forEach(extractUrlshiftdelete);

    } catch (error) {
      console.error("Something went wrong while scraping shiftdelete --> \n\t" + error);
    }
  }

// Given parent div of a element with href to the product, extracts the href from the element
extractUrlshiftdelete = (div_element) => {
    let extracted_href = div_element.children[0].href;
    let baseUrl = 'https://forum.shiftdelete.net'
    if (!extracted_href.includes('prefix_id')){
        shiftdeleteUrls.push(baseUrl+extracted_href);
    }
}

// -- Call funciton to scrape Gittigidiyor for varios products below -->
let shiftdeleteUrls = []

let shiftdelete = async () => {
    const page_limit = 20 // number of pages to scrape for url's
    for(let i=1; i < page_limit; i ++){
        let baseSearchUrl = 'https://forum.shiftdelete.net/forumlar/iphone.85/page-'+i
        let productHrefElementQuery = "div.structItem-title";
        await scrapeshiftdelete(baseSearchUrl, productHrefElementQuery);
    }
}

// ==============================================================================

//functions to WebScrape Korkusuz for news url's -->
scrapeteknopat = async (searchURL, productHrefElementQuery) => {
    try {
        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        //loop through each product element and extract the url of corresponding product's page
        element.forEach(extractUrlteknopat);

    } catch (error) {
      console.error("Something went wrong while scraping teknopat --> \n\t" + error);
    }
  }

// Given parent div of a element with href to the product, extracts the href from the element
extractUrlteknopat = (div_element) => {
    let extracted_href = div_element.children[0].href;
    let baseUrl = 'https://www.technopat.net'
    teknopatUrls.push(baseUrl+extracted_href);
}

// -- Call funciton to scrape Gittigidiyor for varios products below -->
let teknopatUrls = []

let teknopat = async () => {
    const page_limit = 15 // number of pages to scrape for url's
    for(let i=1; i < page_limit; i ++){
        let baseSearchUrl = 'https://www.technopat.net/sosyal/bolum/dizuestue-bilgisayarlar.29/page-'+i
        let productHrefElementQuery = "div.structItem-title";
        await scrapeteknopat(baseSearchUrl, productHrefElementQuery);
    }
}

// ==============================================================================

//functions to WebScrape Korkusuz for news url's -->
scrapechip = async (searchURL, productHrefElementQuery) => {
    try {
        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        //loop through each product element and extract the url of corresponding product's page
        element.forEach(extractUrlchip);

    } catch (error) {
      console.error("Something went wrong while scraping chip --> \n\t" + error);
    }
  }

// Given parent div of a element with href to the product, extracts the href from the element
extractUrlchip = (div_element) => {
    let extracted_href = div_element.children[0].href;
    chipUrls.push(extracted_href);
}

// -- Call funciton to scrape Gittigidiyor for varios products below -->
let chipUrls = []

let chip = async () => {
    const page_limit = 15 // number of pages to scrape for url's
    for(let i=1; i < page_limit; i ++){
        let baseSearchUrl = 'https://www.chip.com.tr/forum/iphone-f126/'+i
        let productHrefElementQuery = "div.thread-title-cell h3";
        await scrapechip(baseSearchUrl, productHrefElementQuery);
    }
}

// ==============================================================================

//functions to WebScrape Korkusuz for news url's -->
scrapehurriyet = async (searchURL, productHrefElementQuery) => {
    try {
        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        //loop through each product element and extract the url of corresponding product's page
        element.forEach(extractUrlhurriyet);

    } catch (error) {
      console.error("Something went wrong while scraping hurriyet --> \n\t" + error);
    }
  }

// Given parent div of a element with href to the product, extracts the href from the element
extractUrlhurriyet = (div_element) => {
    let extracted_href = div_element.children[0].href;
    let baseUrl = 'https://www.hurriyet.com.tr'
    hurriyetUrls.push(baseUrl+extracted_href);
}

// -- Call funciton to scrape Gittigidiyor for varios products below -->
let hurriyetUrls = []

let hurriyet = async () => {
    const page_limit = 15 // number of pages to scrape for url's
    for(let i=1; i < page_limit; i ++){
        let baseSearchUrl = 'https://www.hurriyet.com.tr/gundem/?p='+i
        let productHrefElementQuery = "div.category__list__item";
        await scrapehurriyet(baseSearchUrl, productHrefElementQuery);
    }
}

// ==============================================================================

//functions to WebScrape Korkusuz for news url's -->
scrapeyenisafak = async (searchURL, productHrefElementQuery) => {
    try {
        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        //loop through each product element and extract the url of corresponding product's page
        element.forEach(extractUrlyenisafak);
    } catch (error) {
      console.error("Something went wrong while scraping yenisafak --> \n\t" + error);
    }
  }

// Given parent div of a element with href to the product, extracts the href from the element
extractUrlyenisafak = (div_element) => {
    let extracted_href = div_element.href;
    let baseUrl = 'https://www.yenisafak.com'
    yenisafakUrls.push(baseUrl+extracted_href);
}

// -- Call funciton to scrape Gittigidiyor for varios products below -->
let yenisafakUrls = []

let yenisafak = async () => {
    for(let i of ["gundem","dunya"]){
        let baseSearchUrl = 'https://www.yenisafak.com/'+i
        let productHrefElementQuery = "a.entry";
        await scrapeyenisafak(baseSearchUrl, productHrefElementQuery);
    }
}

// ==============================================================================

//functions to WebScrape Korkusuz for news url's -->
scrapesahibinden = async (searchURL, productHrefElementQuery) => {
    try {
        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        //loop through each product element and extract the url of corresponding product's page
        element.forEach(extractUrlsahibinden);
    } catch (error) {
      console.error("Something went wrong while scraping sahibinden --> \n\t" + error);
    }
  }

// Given parent div of a element with href to the product, extracts the href from the element
extractUrlsahibinden = (div_element) => {
    let extracted_href = div_element.children[2].href;
    let baseUrl = 'https://www.sahibinden.com'
    sahibindenUrls.push(baseUrl+extracted_href);
}

// -- Call funciton to scrape Gittigidiyor for varios products below -->
let sahibindenUrls = []

let sahibinden = async () => {
    const page_limit = 12
    for(let i=1; i < page_limit; i ++){
        let baseSearchUrl = `https://www.sahibinden.com/emlak?pagingOffset=${i*20}&query_text_mf=zekeriyakoy&query_text=zekeriyakoy`
        let productHrefElementQuery = "td.searchResultsTitleValue";
        await scrapesahibinden(baseSearchUrl, productHrefElementQuery);
    }
}
// ==============================================================================

//functions to WebScrape Korkusuz for news url's -->
scrapegittigidiyor = async (searchURL, productHrefElementQuery) => {
    try {

        const response = await axios.get(searchURL);
        const dom = new JSDOM(response.data);
        const element = dom.window.document.querySelectorAll(productHrefElementQuery);
        console.log(element.length)
        element.forEach(extractUrlgittigidiyor);

    } catch (error) {
      console.error("Something went wrong while scraping gittigidiyor --> \n\t" + error);
    }
  }

// Given parent div of a element with href to the product, extracts the href from the element
extractUrlgittigidiyor = (div_element) => {
    console.log(div_element)
    console.log(div_element.children[0])
    let extracted_href = div_element.children[0].href;
    
    gittigidiyorUrls.push(extracted_href);
}

// -- Call funciton to scrape Gittigidiyor for varios products below -->
let gittigidiyorUrls = []

let gittigidiyor = async () => {
    const page_limit = 2
    for(let i=1; i < page_limit; i ++){
        let baseSearchUrl = 'https://www.gittigidiyor.com/arama?k=ipad&sf='+i
        let productHrefElementQuery = "div.sc-533kbx-0 div.pmyvb0-0 ul.sc-1yvp483-0";
        await scrapegittigidiyor(baseSearchUrl, productHrefElementQuery);
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
            "sozcu": sozcuUrls,
            "posta": postaUrls,
            "cumhuriyet": cumhuriyetUrls,
            'amazon': amazonUrls,
            'hepsiburada': hepsiburadaUrls,
            'gittigidiyor': gittigidiyorUrls,
            'teknopat': teknopatUrls,
            'shiftdelete': shiftdeleteUrls,
            'chip': chipUrls,
            'hurriyet': hurriyetUrls,
            'yenisafak': yenisafakUrls,
            'sahibinden': sahibindenUrls
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
    //await trendyol();
    console.log('-Scraping trendyol.com finished. ' + trendyolUrls.length + ' URL\'s were successfully scraped.')
    console.log('+Starting to scrape n11.com ...')
    //await n11();
    console.log('-Scraping n11.com finished. ' + n11Urls.length + ' URL\'s were successfully scraped.')
    console.log('+Starting to scrape donanimhaber.com ...')
    //await dh();
    console.log('-Scraping donanimhaber.com finished. ' + dhUrls.length + ' URL\'s were successfully scraped.')
    console.log('+Starting to scrape eksisozluk.com ...')
    //await eksi();
    console.log('-Scraping eksisozluk.com finished. ' + eksiUrls.length + ' URL\'s were successfully scraped.')
    //await sozcu();
    console.log('-Scraping sozcu.com.tr finished. ' + sozcuUrls.length + ' URL\'s were successfully scraped.')
    await cumhuriyet();
    console.log('-Scraping https://www.cumhuriyet.com.tr finished. ' + cumhuriyetUrls.length + ' URL\'s were successfully scraped.')
    await posta();
    console.log('-Scraping https://www.posta.com.tr/ finished. ' + postaUrls.length + ' URL\'s were successfully scraped.')
    await amazon();
    console.log('-Scraping https://www.amazon.com.tr/ finished. ' + amazonUrls.length + ' URL\'s were successfully scraped.')
    await hepsiburada();
    console.log('-Scraping https://www.hepsiburada.com/ finished. ' + hepsiburadaUrls.length + ' URL\'s were successfully scraped.')
    await teknopat();
    console.log('-Scraping https://www.technopat.net/ finished. ' + teknopatUrls.length + ' URL\'s were successfully scraped.')
    await shiftdelete();
    console.log('-Scraping https://forum.shiftdelete.net/ finished. ' + shiftdeleteUrls.length + ' URL\'s were successfully scraped.')
    await chip();
    console.log('-Scraping https://www.chip.com.tr/ finished. ' + chipUrls.length + ' URL\'s were successfully scraped.')
    await hurriyet();
    console.log('-Scraping https://www.hurriyet.com.tr/ finished. ' + hurriyetUrls.length + ' URL\'s were successfully scraped.')
    await yenisafak();
    console.log('-Scraping https://www.yenisafak.com/ finished. ' + yenisafakUrls.length + ' URL\'s were successfully scraped.')
    await sahibinden();
    console.log('-Scraping https://www.sahibinden.com/ finished. ' + sahibindenUrls.length + ' URL\'s were successfully scraped.')
    //await gittigidiyor();
    console.log('-Scraping https://www.gittigidiyor.com/ finished. ' + gittigidiyorUrls.length + ' URL\'s were successfully scraped.')
    console.log('* Starting to save scraped url\'s into "resources/WebPageUrls.json" file ...')
    saveJson();
    console.log("*Successfully saved.")

}

call_script();