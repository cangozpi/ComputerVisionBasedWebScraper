import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';


/* For form*/
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 


const MaterialComponents = [
  MatSliderModule,
  CdkAccordionModule,
  MatExpansionModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  HttpClientModule,
  MatSelectModule,
  MatInputModule,
  FormsModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatDialogModule
];


@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
