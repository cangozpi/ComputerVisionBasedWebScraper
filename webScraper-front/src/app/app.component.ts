import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // ================ Shopping =================

  // holds shopping site scraped information
  shoppingScrapedInfo: ShoppingResponseJSON = {
    title: "",
    seller: "",
    ratings: "",
    price: "",
    reviews: [],
    product_info: "",
    product_specs: "",
    main_photo: null,
    options: "",
    summary: "",
    product_desc: "",
  } 
  //receive shopping ScrapingInformation coming from the child component
  receiveShoppingScrapingEvent(data:ShoppingResponseJSON){
    // console.log(data)
    this.shoppingScrapedInfo = data;
  }

  
  // ================== Forum ===============
  
  // holds shopping site scraped information
  forumScrapedInfo: ForumResponseJSON = {
    main_topic: "",
    main_post: "",
    post_owner: "",
    date_info: "",
    forum_category: "",
    data: [{answer_owner: "", answer: ""}]
  } 

  //receive forum ScrapingInformation coming from the child component
  receiveForumScrapingEvent(data:ForumResponseJSON){
    // console.log(data)
    this.forumScrapedInfo = data;
  }

  
}





export interface ShoppingResponseJSON{
  title: string;
  seller: string;
  ratings: string;
  price: string;
  reviews: string[];
  product_info: string;
  product_specs: string;
  main_photo: any;
  options: string;
  summary: string;
  product_desc: string;
}


export interface ForumResponseJSON{
  main_topic: string,
  main_post: string,
  post_owner: string,
  date_info: string,
  forum_category: string
  data: [{answer_owner: string, answer: string}]
}