import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-item-comments',
  templateUrl: './item-comments.component.html',
  styleUrls: ['./item-comments.component.css']
})
export class ItemCommentsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(data.details)
    // console.log(data.details.reviews)
    // console.log(data.details.product_info)
  }

  ngOnInit(): void {
  }

}
