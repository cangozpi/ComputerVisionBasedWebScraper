# WebScraper Frontend
## Front end implementation of the web application using Angular 2+
---  

* Angular CLI version "12.2.12".
* Node version *v16.13.0* is currently supported.
* npm version *8.1.2* is currently supported.

---

## Usage:
1)
      * Run the command below inside the *webScraper-front* directory to install the required dependencies.

    ```bash
        npm install
    ```
2)
    * Run the command below to start the web server on your local machine.
    ```bash
        ng serve
    ```
    *or (to start the server on a certain port)*
    
    ```bash
        ng serve --port <port>
    ```
    *or*
    ```bash
        npm run start
    ```

    ---

    ## Folder Structure:
    * Generate angular services, directives, components under their corresponding folders namely, *src/app/services*, *src/app/directives*, *src/app/components*
    * The following can be used to generate
    1) Angular services:
    ```bash
    ng generate service src/app/<serviceName>
    ```
    2) Angular services:
    ```bash
    ng generate directive src/app/<directiveName>
    ```
    3) Angular component:
    ```bash
    ng generate component src/app/<componentName>
    ```
    * **Note**: Please create modules for the components you generate and do not include that module in the *app.module.ts* file.