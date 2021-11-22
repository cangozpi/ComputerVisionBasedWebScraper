import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

  // Form handling
  inputForm = new FormGroup({
    websiteType: new FormControl(''),
    targetURL: new FormControl(''),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.inputForm.value);
  }


  // value is for clearing URL button
  value = '';
  //

  constructor() { }

  ngOnInit(): void {
  }

}
