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
    Change the site_dir path and URL's to the site that is going to be labelled.

4)
    Enter class labels to the list.

5)
    Find and replace corresponding div elements from page inspect

6)
    * To run the script,  run the command below inside the *auto labeler* directory:

    ```bash
        node app.js
    ```
7)
    Change the dirs list in label_formatter.py to the site you labeled.
    
8)
    Run the command below  inside the *auto labeler* directory to convert the labels to YOLO txt format:
    ```bash
        python label_formatter.py
    ```
9)
    If there are missing packages use pip install to install them.

10)
    If you would like to see the labels in LabelImg create a txt file called "classes.txt" inside "\\data\\site_that_is_labelled\\label\\yolo".
    Add the class names in the same order as app.js to this file. One class every line and an empty line at the end. 