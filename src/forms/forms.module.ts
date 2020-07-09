import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
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
    ReactiveFormsModule
  ]
})
export class FormsModule { }
