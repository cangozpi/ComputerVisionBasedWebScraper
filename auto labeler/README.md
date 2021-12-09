## Auto Data Labeler
Aim of these scripts is to download labelled data from the internet in the yolov5 format.

---

### Usage:
1)
      * Run the command below inside the *auto labeler* directory to install the required dependencies.

    ```bash
        npm install
    ```
2)
    * Run the command below inside the *data collection pipeline* directory.Run the command below to web scrape pre-defined web pages for URL's that will then be used to take screenshots.
    ```bash
        npm run url_pipeline
    ```
    *or*
    
    ```bash
        cd src
        node urlScraper.js
    ```
    Upon successfull completion of this script. The scraped URL's will be saved into **resources/webPageUrls.json** file in JSON format.
3)
    * To run the script,  run the command below inside the *auto labeler* directory:

    ```bash
        node app.js
    ```