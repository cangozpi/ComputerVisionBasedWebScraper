package model;
import java.awt.image.BufferedImage;

public class ShoppingSiteModel {

    String title; // name of the product
    String seller; // name of the seller store
    int ratings ; //star and number of reviews
    double price; // price of the product
    String review; // singular review

    String question; //if present, questions that users asked to the seller
    String product_info; //detailed product info not the short version
    String product_specs; // specs sheet/table of the product
    BufferedImage[] photo; //other photos of the product
    BufferedImage main_photo; //big image of the product
    String options; //different options for the product
    String product_desc; //extended description of the product if available

    public ShoppingSiteModel(String title, String seller, int ratings, double price, String review, String question, String product_info, String product_specs, BufferedImage[] photo, BufferedImage main_photo, String options, String product_desc) {
        this.title = title;
        this.seller = seller;
        this.ratings = ratings;
        this.price = price;
        this.review = review;
        this.question = question;
        this.product_info = product_info;
        this.product_specs = product_specs;
        this.photo = photo;
        this.main_photo = main_photo;
        this.options = options;
        this.product_desc = product_desc;
    }

    public ShoppingSiteModel(){




    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public int getRatings() {
        return ratings;
    }

    public void setRatings(int ratings) {
        this.ratings = ratings;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getProduct_info() {
        return product_info;
    }

    public void setProduct_info(String product_info) {
        this.product_info = product_info;
    }

    public String getProduct_specs() {
        return product_specs;
    }

    public void setProduct_specs(String product_specs) {
        this.product_specs = product_specs;
    }

    public BufferedImage[] getPhoto() {
        return photo;
    }

    public void setPhoto(BufferedImage[] photo) {
        this.photo = photo;
    }

    public BufferedImage getMain_photo() {
        return main_photo;
    }

    public void setMain_photo(BufferedImage main_photo) {
        this.main_photo = main_photo;
    }

    public String getOptions() {
        return options;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    public String getProduct_desc() {
        return product_desc;
    }

    public void setProduct_desc(String product_desc) {
        this.product_desc = product_desc;
    }

}
