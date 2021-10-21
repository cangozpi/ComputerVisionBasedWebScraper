# Data pipeline that is used to collect image data which are then to be labeled for training the deep learning based computer vision models.

* Node version *v16.4.0* is currently supported.
* npm version *7.18.1* is currently supported.

---

## Usage:
1)
      * Run the command below inside the *data collection pipeline* directory to install the required dependencies.

    ```bash
        npm install
    ```
2)
    * Run the command below to web scrape pre-defined web pages for URL's that will then be used to take screenshots.
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
    * To run the script:

    ```bash
        npm run screenshot_pipeline
    ```

    *or*

    ```bash
        node app.js
    ```
    * Upon successful completion of the script, it downloads the screenshots of webpages specified by url in the *resources/webPageUrls.json* file. These are downloaded into the folder **WebsiteScreenShots/**(Note: This folder will be created in case it doesn't exist. Also, **it is normal if it takes some time to execute** this command since ~5k images will be downloading from web).