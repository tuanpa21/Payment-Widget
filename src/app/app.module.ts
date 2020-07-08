import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {PaymentFormComponent} from 'src/pages/payment-form/payment-form.component';
import {PaymentResultComponent} from 'src/pages/payment-result/payment-result.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentFormComponent,
    PaymentResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
