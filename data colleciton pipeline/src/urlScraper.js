// Run this script to scrape URL's from webistes to initialize the webPageUrls.json file

const axios = require('axios').default;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

getUser = async () => {
    try {
      const response = await axios.get('https://github.com/axios/axios');
      const dom = new JSDOM(response.data)
      const element = dom.window.document.querySelector('.Box-title')
      
      console.log(element.children[0].innerHTML);
    } catch (error) {
      console.error(error);
    }
  }


  getUser();
