const express = require("express");
const execSync = require('child_process').execSync;
const path = require('path');
var cors = require('cors')
var bodyParser = require('body-parser');
const app = express();
app.use(cors())

// create application/json parser
var jsonParser = bodyParser.json()


app.post("/scrape/shoppingSite/scrapeShopping", jsonParser, (req, res) => {
    let websiteType = req.body.websiteType
    let targetURL = req.body.targetURL
    console.log(req.body)
    //execSync(`node  ./Service.js "${targetURL}" ${websiteType}`,{stdio: 'inherit'});
    res.sendFile(path.join(__dirname, './', 'data.json'));
  });

  app.post("/websiteclassifier", jsonParser, (req, res) => {
    let targetURL = req.body.targetURL
    let websiteClass = 'shopping-site'
    if (targetURL.includes("sozcu") || targetURL.includes("hurriyet")){
      websiteClass = 'news-site'
    }else if (targetURL.includes("forum") || targetURL.includes("eksi")){
      websiteClass = 'forum-site'
    }
    res.send({
      "site_type": websiteClass
    });
  });

app.listen(8080, () => {
    console.log("Server running on port 8080")
});