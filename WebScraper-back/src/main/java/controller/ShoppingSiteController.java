package controller;


import Service.ShoppingSiteService;
import model.ShoppingSiteModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("scrape/shoppingSite")
public class ShoppingSiteController {

    @Autowired
    private ShoppingSiteService shoppingSiteService;


    @PostMapping("/scrapeShopping")
    public ShoppingSiteModel scrapeShopping(@RequestBody String url){

        return shoppingSiteService.scrapeShopping(url);
    }

}
