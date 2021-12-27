import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  @Output() newShoppingScrapingEvent = new EventEmitter<ShoppingResponseJSON>();
  @Output() newForumScrapingEvent = new EventEmitter<ForumResponseJSON>();
  @Output() newNewsScrapingEvent = new EventEmitter<NewsResponseJSON>();
  @Output() updateTableStatus = new EventEmitter<TableStatus>();

  private tableStatus: TableStatus = {
    forumTableActive: false,
    shoppingTableActive: false,
    newsTableActive: false,
  }

  sendShoppingScrapingEvent(data: ShoppingResponseJSON){
    this.newShoppingScrapingEvent.emit(data);
  }

  sendForumScrapingEvent(data: ForumResponseJSON){
    this.newForumScrapingEvent.emit(data);
  }

  sendNewsScrapingEvent(data: NewsResponseJSON){
    this.newNewsScrapingEvent.emit(data);
  }

  tableStatusChanged(data: TableStatus){
    this.updateTableStatus.emit(data);
  }

  // Form handling
  inputForm = new FormGroup({
    websiteType: new FormControl(''),
    targetURL: new FormControl(''),
  });

  onSubmit() {
    // POST request body
    let scrapeRequestTemplate = {
      websiteType: this.inputForm.value.websiteType,
      targetURL: this.inputForm.value.targetURL,
    }



    if(scrapeRequestTemplate.websiteType == 'infer-site'){
      //make POST request to server 
      let url = "http://localhost:8080/websiteclassifier"; //TODO: change localhost 
      this.http.post(url, {targetURL: this.inputForm.value.targetURL}).toPromise().then((data:any) => {
        // console.log(data.site_type)
        scrapeRequestTemplate.websiteType = data.site_type
      })
    }


    //make POST request to server 
    let url = "http://localhost:8080/scrape/shoppingSite/scrapeShopping"; //TODO: change localhost 
    this.http.post(url, scrapeRequestTemplate).toPromise().then((data:any) => {
    // console.log(data)
    
    if(scrapeRequestTemplate.websiteType == "shopping-site"){
      // parse the response body
    let responseJSON: ShoppingResponseJSON = {
      title : data.title,
      seller: data.seller,
      ratings: data.ratings,
      price: data.price,
      reviews: data.reviews,
      product_info: data.product_info,
      product_specs: data.product_specs,
      main_photo: data.main_photo,
      options: data.options,
      summary: data.summary,
      product_desc: data.product_desc,
    }
      this.sendShoppingScrapingEvent(responseJSON)
      // hide/show tables
      this.tableStatus.forumTableActive = false
      this.tableStatus.shoppingTableActive = true
      this.tableStatus.newsTableActive = false

    }else if(scrapeRequestTemplate.websiteType == "forum-site"){
      let responseJSON: ForumResponseJSON = {
        main_topic: data.main_topic,
        main_post: data.main_post,
        post_owner: data.post_owner,
        date_info: data.date_info,
        forum_category: data.forum_category,
        data: data.data
      }
      this.sendForumScrapingEvent(responseJSON)
      // hide/show tables
      this.tableStatus.forumTableActive = true
      this.tableStatus.shoppingTableActive = false
      this.tableStatus.newsTableActive = false

    }else if(scrapeRequestTemplate.websiteType == "news-site"){
      let responseJSON: NewsResponseJSON = {
        title: data.title, 
        writer: data.writer,
        date_info: data.date_info,
        subtitle: data.subtitle,
        main_text: data.main_text,
        main_text_titles: data.main_text_titles,
        photo: data.photo,
      }
      this.sendNewsScrapingEvent(responseJSON)

      // hide/show tables
      this.tableStatus.forumTableActive = false
      this.tableStatus.shoppingTableActive = false
      this.tableStatus.newsTableActive = true
    }

    // update table status
    this.tableStatusChanged(this.tableStatus)
      
  })
    



  }


  // value is for clearing URL button
  value = '';
  //

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
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


// Template for the response of the News Site Scraping
export interface NewsResponseJSON{
  title: string, 
  writer: string,
  date_info: string,
  subtitle: string,
  main_text: string,
  main_text_titles: string[],
  photo: string,
}


export interface TableStatus{
  forumTableActive: boolean,
  shoppingTableActive: boolean,
  newsTableActive: boolean,
}