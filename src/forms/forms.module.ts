import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {ValidatorMesssagePipe} from 'src/forms/validator-messsage.pipe';

@NgModule({
  declarations: [
    ValidatorMesssagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ValidatorMesssagePipe,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
  ]
})
export class FormsUtilModule { }
