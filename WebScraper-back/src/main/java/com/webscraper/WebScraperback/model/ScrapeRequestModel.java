package com.webscraper.WebScraperback.model;

public class ScrapeRequestModel {

    private String websiteType;
    private String targetURL;

    public ScrapeRequestModel(String websiteType, String targetURL){
        this.websiteType = websiteType;
        this.targetURL = targetURL;
    }


    public String getWebsiteType() {
        return this.websiteType;
    }


    public String getTargetURL() {
        return this.targetURL;
    }


    public void setWebsiteType(String websiteType) {
        this.websiteType = websiteType;
    }

    public void setTargetURL(String url) {
        this.targetURL = url;
    }
}
