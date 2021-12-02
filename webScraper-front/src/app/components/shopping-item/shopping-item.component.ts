import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit {

  displayedColumns: string[] = ['product-title', 'product-sellerInfo', 'product-rating', 'product-price', 'product-comments'];
  dataSource = product_data;

  constructor() { }

  ngOnInit(): void {
  }

}


export interface ProductItem {
  title: string;
  info: string;
  rating: number;
  price: number;
  comments: string;
}

const product_data: ProductItem[] = [
  {title: "iphone-11Pro max", info: 'Çok güzel bir telefon.', rating: 4.3, price: 20000, comments:"yoruma gerek yok!"},
  {title: "iphone-11Pro max", info: 'Çok güzel bir telefon.', rating: 4.3, price: 20000, comments:"yoruma gerek yok!"},
  {title: "iphone-11Pro max", info: 'Çok güzel bir telefon.', rating: 4.3, price: 20000, comments:"yoruma gerek yok!"},
  {title: "iphone-11Pro max", info: 'Çok güzel bir telefon.', rating: 4.3, price: 20000, comments:"yoruma gerek yok!"},
  {title: "iphone-11Pro max", info: 'Çok güzel bir telefon.', rating: 4.3, price: 20000, comments:"yoruma gerek yok!"},
  {title: "iphone-11Pro max", info: 'Çok güzel bir telefon.', rating: 4.3, price: 20000, comments:"yoruma gerek yok!"},
  {title: "iphone-11Pro max", info: 'Çok güzel bir telefon.', rating: 4.3, price: 20000, comments:"yoruma gerek yok!"},
  {title: "iphone-11Pro max", info: 'Çok güzel bir telefon.', rating: 4.3, price: 20000, comments:"yoruma gerek yok!"},
  {title: "iphone-11Pro max", info: 'Çok güzel bir telefon.', rating: 4.3, price: 20000, comments:"yoruma gerek yok!"},
  {title: "iphone-11Pro max", info: 'Çok güzel bir telefon.', rating: 4.3, price: 20000, comments:"yoruma gerek yok!"}

];