const express = require("express");
const execSync = require('child_process').execSync;
const path = require('path');
var bodyParser = require('body-parser');
const app = express();

// create application/json parser
var jsonParser = bodyParser.json()


app.post("/scrape/shoppingSite/scrapeShopping", jsonParser, (req, res) => {
    let websiteType = req.body.websiteType
    let targetURL = req.body.targetURL
    console.log(req.body)
    //execSync(`node  ./Service.js "${targetURL}" ${websiteType}`,{stdio: 'inherit'});
    res.sendFile(path.join(__dirname, './', 'data.json'));
  });

app.listen(8080, () => {
    console.log("Server running on port 8080")
});