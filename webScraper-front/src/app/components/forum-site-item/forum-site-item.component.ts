import { TypeofExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ForumAnswersComponent } from './forum-answers/forum-answers.component';

@Component({
  selector: 'app-forum-site-item',
  templateUrl: './forum-site-item.component.html',
  styleUrls: ['./forum-site-item.component.css']
})
export class ForumSiteItemComponent implements OnInit {

  displayedColumns: string[] = ['main_topic', 'main_post', 'post_owner', 'date_info', 'forum_category', 'answers'];
  dataSource = product_data;

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(ForumAnswersComponent, {
      data: {answers: AnswersJSON.answers}
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
  main_topic: string,
  main_post: string,
  post_owner: string,
  date_info: string,
  forum_category: string
  data: [{answer_owner: string, answer: string}]
}


let AnswersJSON = {
  answers:[
    {
    'answer_owner': 'AnswerOwner1',
    'answer': "Cevap1"
  },
  {
    'answer_owner': 'AnswerOwner2',
    'answer': "Cevap2"
  },
  {
    'answer_owner': 'AnswerOwner3',
    'answer': "Cevap3"
  }
],
}



export interface ProductItem {
  main_topic: string,
  main_post: string,
  post_owner: string,
  date_info: string,
  forum_category: string
}

const product_data: ProductItem[] = [
  {main_topic: "Robot Operating System", main_post: "ROS nedir, ne işe yarar, kim niye kullanır ?", post_owner: "Ali Veli", date_info: "3 Mart 2021", forum_category:"Mecathronic Engineering"},
  {main_topic: "Robot Operating System", main_post: "ROS nedir, ne işe yarar, kim niye kullanır ?", post_owner: "Ali Veli", date_info: "3 Mart 2021", forum_category:"Mecathronic Engineering"},
  {main_topic: "Robot Operating System", main_post: "ROS nedir, ne işe yarar, kim niye kullanır ?", post_owner: "Ali Veli", date_info: "3 Mart 2021", forum_category:"Mecathronic Engineering"},
  {main_topic: "Robot Operating System", main_post: "ROS nedir, ne işe yarar, kim niye kullanır ?", post_owner: "Ali Veli", date_info: "3 Mart 2021", forum_category:"Mecathronic Engineering"},
  {main_topic: "Robot Operating System", main_post: "ROS nedir, ne işe yarar, kim niye kullanır ?", post_owner: "Ali Veli", date_info: "3 Mart 2021", forum_category:"Mecathronic Engineering"},
  {main_topic: "Robot Operating System", main_post: "ROS nedir, ne işe yarar, kim niye kullanır ?", post_owner: "Ali Veli", date_info: "3 Mart 2021", forum_category:"Mecathronic Engineering"},
  {main_topic: "Robot Operating System", main_post: "ROS nedir, ne işe yarar, kim niye kullanır ?", post_owner: "Ali Veli", date_info: "3 Mart 2021", forum_category:"Mecathronic Engineering"},
  {main_topic: "Robot Operating System", main_post: "ROS nedir, ne işe yarar, kim niye kullanır ?", post_owner: "Ali Veli", date_info: "3 Mart 2021", forum_category:"Mecathronic Engineering"},
  {main_topic: "Robot Operating System", main_post: "ROS nedir, ne işe yarar, kim niye kullanır ?", post_owner: "Ali Veli", date_info: "3 Mart 2021", forum_category:"Mecathronic Engineering"},
  {main_topic: "Robot Operating System", main_post: "ROS nedir, ne işe yarar, kim niye kullanır ?", post_owner: "Ali Veli", date_info: "3 Mart 2021", forum_category:"Mecathronic Engineering"},
  {main_topic: "Robot Operating System", main_post: "ROS nedir, ne işe yarar, kim niye kullanır ?", post_owner: "Ali Veli", date_info: "3 Mart 2021", forum_category:"Mecathronic Engineering"},
 

];
