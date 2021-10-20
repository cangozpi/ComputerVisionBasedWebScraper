# Data pipeline that is used to collect image data which are then to be labeled for training the deep learning based computer vision models.

* Node version *v16.4.0* is currently supported.
* npm version *7.18.1* is currently supported.

---

## Usage:
* Run the command below inside the *data collection pipeline* directory to install the required dependencies.
```bash
npm install
```

* To run the script:

```bash
node run pipeline
```
*or*
```bash
node app.js
```
* Upon successful running of the script, it downloads the screenshots of webpages specified by url in the *resources/webPageUrls.json* file. These are downloaded into the folder WebsiteScreenShots(Note: This folder will be created in case it doesn't exist).