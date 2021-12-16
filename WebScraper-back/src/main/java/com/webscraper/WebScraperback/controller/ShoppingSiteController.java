package com.webscraper.WebScraperback.controller;


import com.webscraper.WebScraperback.Service.ShoppingSiteService;

import com.webscraper.WebScraperback.model.ScrapeRequestModel;
import com.webscraper.WebScraperback.model.ShoppingSiteModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/scrape/shoppingSite")
public class ShoppingSiteController {

    @Autowired
    private ShoppingSiteService shoppingSiteService;


    @PostMapping("/scrapeShopping")
    @ResponseBody
    public ShoppingSiteModel scrapeShopping(@RequestBody ScrapeRequestModel scrapeRequestModel){

        return shoppingSiteService.scrapeShopping(scrapeRequestModel.getWebsiteType(), scrapeRequestModel.getTargetURL());
    }


}
