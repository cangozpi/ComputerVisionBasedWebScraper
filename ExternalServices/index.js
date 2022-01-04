const express = require("express");
const execSync = require('child_process').execSync;
var fs = require('fs')
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
    execSync(`node  ./Service.js "${targetURL}" ${websiteType}`,{stdio: 'inherit'});
    res.sendFile(path.join(__dirname, './', 'data.json'));
  });

  app.post("/websiteclassifier", jsonParser, (req, res) => {
    let targetURL = req.body.targetURL
    
    console.log(`inferring the site type of the url: ${targetURL}`)

    execSync(`node  ./Screenshot/ScreenShot.js "${targetURL}"`,{stdio: 'inherit'});

    execSync(`python  ./AI/classifier.py`,{stdio: 'inherit'});

    const filename = './classifier_output.txt'
    fs.readFile(filename, 'utf8', function(err, data) {
      if (err) throw err;
      console.log(data)
      res.send({
        "site_type": data
      });
    });
  });

app.listen(8080, () => {
    console.log("Server running on port 8080")
});