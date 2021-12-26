import { TypeofExpr } from '@angular/compiler';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ForumAnswersComponent } from './forum-answers/forum-answers.component';

@Component({
  selector: 'app-forum-site-item',
  templateUrl: './forum-site-item.component.html',
  styleUrls: ['./forum-site-item.component.css']
})
export class ForumSiteItemComponent implements OnInit, OnChanges {
  // holds shopping site scraped information
  @Input() forumScrapedInfo: ForumResponseJSON = {
    main_topic: "",
    main_post: "",
    post_owner: "",
    date_info: "",
    forum_category: "",
    data: [{answer_owner: "", answer: ""}]
  } 

  // handle incoming JSON data
  private forum_data: ForumItem[] = [
    // {title: "iphone-11Pro max", seller: "Ali Veli", ratings: "4.3", price: "20000$"},
    {main_topic: this.forumScrapedInfo.main_topic, post_owner: this.forumScrapedInfo.post_owner, date_info: this.forumScrapedInfo.date_info, forum_category: this.forumScrapedInfo.forum_category}
    
  ];

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      //console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
      if(propName == 'forumScrapedInfo'){ //forum scraping information has received/changed
        // this.dataSource = chng.currentValue;
        // set table column information
        this.dataSource = [
          {main_topic: chng.currentValue.main_topic, post_owner: chng.currentValue.post_owner, date_info: chng.currentValue.date_info, forum_category: chng.currentValue.forum_category},
        ];

        // set model window information
        this.modalWindowJSON = {
          main_post: chng.currentValue.main_post,
          data: chng.currentValue.data,
      }
      // console.log(chng.currentValue)
      }
    }
  }

  // handle incoming scraped information displayed on the modal(dialog) window
  public modalWindowJSON = {
    main_post: "",
    data: [{answer_owner: "", answer: ""}]
}

  displayedColumns: string[] = ['main_topic', 'post_owner', 'date_info', 'forum_category', 'details'];
  public dataSource = this.forum_data;

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(ForumAnswersComponent, {
      data: {main_post: this.modalWindowJSON.main_post, answers: this.modalWindowJSON.data}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }
  

}



export interface ForumResponseJSON{
  main_topic: string,
  main_post: string,
  post_owner: string,
  date_info: string,
  forum_category: string
  data: [{answer_owner: string, answer: string}]
}

export interface ForumItem {
  main_topic: string,
  post_owner: string,
  date_info: string,
  forum_category: string
}