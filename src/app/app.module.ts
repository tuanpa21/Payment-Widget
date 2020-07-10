import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {
  MatCardModule
} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {FormsUtilModule} from 'src/forms/forms.module';
import {PaymentFormComponent} from 'src/pages/payment-form/payment-form.component';
import {PaymentResultComponent} from 'src/pages/payment-result/payment-result.component';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    PaymentFormComponent,
    PaymentResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(maskConfig),
    MatCardModule,
    FormsUtilModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
