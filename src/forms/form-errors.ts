import {InjectionToken} from '@angular/core';


export const defaultErrors = {
  required: (error) => `This field is required`,
  minlength: ({requiredLength, actualLength}) => `Expect ${requiredLength} but got ${actualLength}`,
  min: ({min}) => `Value must be greater than or equal to ${min}`,
  max: ({max}) => `Value must be less than or equal to ${max}`,
  email: (error) => `LOGIN_FORM.EMAIL_VALIDATION`,
  password: (error) => `Passwords do not match`,
  number: (error) => `Value must be numeric`,
  integer: (error) => `Value must be an integer`
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
