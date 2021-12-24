import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
  //receive ScrapingInformation coming from the child component
  receiveShoppingScrapingEvent(data:ShoppingResponseJSON){
    // console.log(data)
    this.shoppingScrapedInfo = data;
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
