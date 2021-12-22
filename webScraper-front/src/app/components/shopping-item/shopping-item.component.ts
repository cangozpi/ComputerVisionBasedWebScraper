import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ItemCommentsComponent } from './item-comments/item-comments.component';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit {

  displayedColumns: string[] = ['title', 'seller', 'ratings', 'price', 'details'];
  dataSource = product_data;

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(ItemCommentsComponent, {
      data:{details: detailsJSON}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }
  
}

// Template for the response of the Forum Site Scraping
export interface ResponseJSON{
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


// information displayed on the modal(dialog) window
let detailsJSON = {
  reviews: ['çok hızlı kargoyla geldi, güzel bir ürün.', 'sakın almayın ürünün kutusu açılıp yollandı.', 'güzel paketli geldi, öneririm.'],
  product_info: "Yep yeni acaip bir telefon. Çok hızlı.", 
  product_specs: "3 işlemcili, intel i7 serisi, siyah telefon", 
  options: "kırmızı renk, mavi renk", 
  summary: "Almayan pişman hemen alınması gereken bir cihaz.", 
  product_desc:"anlatılmaz yaşanır."
}




export interface ProductItem {
  title: string;
  seller: string;
  ratings: string;
  price: string;
}

const product_data: ProductItem[] = [
  {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
  {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
  {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
  {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
  {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
  {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
  {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
  {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
  {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
  

];