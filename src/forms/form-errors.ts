import {InjectionToken} from '@angular/core';


export const defaultErrors = {
  required: (error) => `This field is required`,
  minlength: ({requiredLength, actualLength}) => `Expect ${requiredLength} but got ${actualLength}`,
  min: ({min}) => `Value must be greater than or equal to ${min}`,
  max: ({max}) => `Value must be less than or equal to ${max}`,
  number: (error) => `Value must be numeric`,
  incorrectCardNumber: (error) => `Not a valid card number`,
  incorrectExpDate: (error) => `Not a valid expiration date`
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
