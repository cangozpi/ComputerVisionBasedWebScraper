import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-news-main-text',
  templateUrl: './news-main-text.component.html',
  styleUrls: ['./news-main-text.component.css']
})
export class NewsMainTextComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    // console.log(data.main_txt)
  }

  ngOnInit(): void {
  }

}
