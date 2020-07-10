import {Inject, Pipe, PipeTransform} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {FORM_ERRORS} from 'src/forms/form-errors';
import {isControlValid} from 'src/forms/reactive-form';

@Pipe({
  name: 'validatorMesssage'
})
export class ValidatorMesssagePipe implements PipeTransform {

  constructor(
    @Inject(FORM_ERRORS) private errors,
  ) {
  }

  transform(value: any, control: FormControl | AbstractControl, customError?: any): string {
    let msg = '';
    if (isControlValid(control)) {
      return msg;
    }

    if (!customError) {
      customError = {};
    }
    const errors = control.errors;
    const firstKey = Object.keys(errors)[0];
    const getError = this.errors[firstKey];
    msg = customError[firstKey] || getError(errors[firstKey]);

    if (!msg) {
      return `not define msg for ${firstKey}`;
    }
    return msg;
  }

}
