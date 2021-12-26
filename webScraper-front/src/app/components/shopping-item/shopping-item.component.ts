import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ItemCommentsComponent } from './item-comments/item-comments.component';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit, OnChanges {
  // holds shopping site scraped information
  @Input() shoppingScrapedInfo: ShoppingResponseJSON = {
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

  // handle incoming JSON data
  private product_data: ProductItem[] = [
    // {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
    {title: this.shoppingScrapedInfo.title, seller: this.shoppingScrapedInfo.seller, ratings: this.shoppingScrapedInfo.ratings, price: this.shoppingScrapedInfo.price},
    
  ];

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      //console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
      if(propName == 'shoppingScrapedInfo'){ //shopping scraping information has received/changed
        // this.dataSource = chng.currentValue;
        // set table column information
        this.dataSource = [
          // {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
          {title: chng.currentValue.title, seller: chng.currentValue.seller, ratings: chng.currentValue.ratings, price: chng.currentValue.price},
        ];

        // set model window information
        this.detailsJSON = {
          reviews: chng.currentValue.reviews,
          product_info: chng.currentValue.product_info, 
          product_specs: chng.currentValue.product_specs, 
          options: chng.currentValue.options, 
          summary: chng.currentValue.summary, 
          product_desc:chng.currentValue.product_desc,
      }
      // console.log(chng.currentValue)
      }
    }
  }

  // handle incoming scraped information displayed on the modal(dialog) window
  public detailsJSON = {
    reviews: [],
    product_info: "", 
    product_specs: "", 
    options: "", 
    summary: "", 
    product_desc:"",
}

  displayedColumns: string[] = ['title', 'seller', 'ratings', 'price', 'details'];
  public dataSource = this.product_data;

  constructor(public dialog: MatDialog) { }
 

  openDialog() {
    const dialogRef = this.dialog.open(ItemCommentsComponent, {
      data:{details: this.detailsJSON}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }


  
}


export interface ProductItem {
  title: string;
  seller: string;
  ratings: string;
  price: string;
}


// const product_data: ProductItem[] = [
//   {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
//   {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
//   {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
//   {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
//   {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
//   {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
//   {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
//   {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
//   {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
  

// ];


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
