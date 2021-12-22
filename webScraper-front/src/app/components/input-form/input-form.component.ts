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
    this.http.post(url, scrapeRequestTemplate, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
  }).toPromise().then((data:any) => {
      console.log(data)
    })

  }


  // value is for clearing URL button
  value = '';
  //

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}
