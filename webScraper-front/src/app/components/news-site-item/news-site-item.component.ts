import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { NewsMainTextComponent } from './news-main-text/news-main-text.component';


@Component({
  selector: 'app-news-site-item',
  templateUrl: './news-site-item.component.html',
  styleUrls: ['./news-site-item.component.css']
})
export class NewsSiteItemComponent implements OnInit {
  // holds shopping site scraped information
  @Input() newsScrapedInfo: NewsResponseJSON = {
    title: "", 
    writer: "",
    date_info: "",
    subtitle: "",
    main_text: "",
    main_text_titles: [""],
    photo: "",
  } 

  // handle incoming JSON data
  private news_data: NewsItem[] = [
    {title: this.newsScrapedInfo.title, writer: this.newsScrapedInfo.writer, date_info: this.newsScrapedInfo.date_info,},
    
  ];



  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      //console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
      if(propName == 'newsScrapedInfo'){ //news scraping information has received/changed
        // this.dataSource = chng.currentValue;
        // set table column information
        this.dataSource = [
          // {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
          {title: chng.currentValue.title, writer: chng.currentValue.writer, date_info: chng.currentValue.date_info,},
        ];

        // set model window information
        this.detailsJSON = {
          subtitle: chng.currentValue.subtitle,
          main_text: chng.currentValue.main_text,
          main_text_titles: chng.currentValue.main_text_titles,
          photo: chng.currentValue.photo,
      }
      // console.log(chng.currentValue)
      }
    }
  }


  // handle incoming scraped information displayed on the modal(dialog) window
  public detailsJSON = {
    subtitle: "",
    main_text: "",
    main_text_titles: [""],
    photo: "",
  }

  displayedColumns: string[] = ['title', 'writer', 'date_info', 'main_text'];
  public dataSource = this.news_data;

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(NewsMainTextComponent, {
      data:{details: this.detailsJSON}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }
  
}



// let JSON_main_txt: string = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo maxime sapiente perferendis tempore corrupti sint labore fuga in quibusdam, itaque optio cupiditate delectus, iste commodi! Nisi iusto rem blanditiis maxime!"

export interface NewsItem {
  title: string 
  writer: string
  date_info: string,
}

// const news_data: NewsItem[] = [
//   {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
//   {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
//   {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
//   {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
//   {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
//   {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
//   {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
//   {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
//   {title : "Doların durumu", writer : "Ali Veli",date_info : "2 kasım 1959",subtitle : "bu devirde pc toplanmaz!", main_text_titles : ["başlık1", "başlık2", "başlık3"] },
  

// ];


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