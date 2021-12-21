import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { NewsMainTextComponent } from './news-main-text/news-main-text.component';


@Component({
  selector: 'app-news-site-item',
  templateUrl: './news-site-item.component.html',
  styleUrls: ['./news-site-item.component.css']
})
export class NewsSiteItemComponent implements OnInit {


  displayedColumns: string[] = ['title', 'writer', 'date_info', 'subtitle', 'main_text_titles', 'main_text'];
  dataSource = news_data;

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(NewsMainTextComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }
  
}


export interface NewsItem {
  title: string 
  writer: string
  date_info: string
  subtitle: string
  main_text_titles: string[]
}

const news_data: NewsItem[] = [
  {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
  {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
  {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
  {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
  {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
  {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
  {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
  {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
  {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
  

];