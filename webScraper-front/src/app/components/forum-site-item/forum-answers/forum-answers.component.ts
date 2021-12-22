import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-forum-answers',
  templateUrl: './forum-answers.component.html',
  styleUrls: ['./forum-answers.component.css']
})
export class ForumAnswersComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(data.answers[0].answer_owner)
    // console.log(data.answers[0].answer)
  }

  ngOnInit(): void {
  }

}
