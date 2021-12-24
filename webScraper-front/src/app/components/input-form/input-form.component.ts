import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

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

    //make POST request to server for /surveillanceUpload
    let url = "http://localhost:8080/scrape/shoppingSite/scrapeShopping"; //TODO: change localhost 
    this.http.post(url, scrapeRequestTemplate).toPromise().then((data:any) => {
      console.log(data)
      // parse the response body
      let ResponseJSON: ShoppingResponseJSON = {
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

      console.log(ResponseJSON)
      if(scrapeRequestTemplate.websiteType == "shopping-site"){
        

      }else if(scrapeRequestTemplate.websiteType == "forum-site"){

      }else if(scrapeRequestTemplate.websiteType == "news-site"){

      }
      // console.log(data)
      // console.log(data.main_photo)
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
