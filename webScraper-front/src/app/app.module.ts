import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Angular Material UI imports*/
import { MaterialModule } from './material/material.module';
import { InputFormComponent } from './components/input-form/input-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AccordionExplanationComponent } from './components/accordion-explanation/accordion-explanation.component';
import { ShoppingItemComponent } from './components/shopping-item/shopping-item.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    AccordionExplanationComponent,
    ShoppingItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
