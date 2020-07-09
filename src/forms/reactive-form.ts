import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

/**
 * Deep clones the given AbstractControl, preserving values, validators, async validators, and disabled status.
 * @param control AbstractControl
 * @returns AbstractControl
 */
export function cloneAbstractControl<T extends AbstractControl>(control: T): T {
  let newControl: T;

  if (control instanceof FormGroup) {
    const formGroup = new FormGroup({}, control.validator, control.asyncValidator);
    const controls = control.controls;

    Object.keys(controls).forEach(key => {
      formGroup.addControl(key, cloneAbstractControl(controls[key]));
    })

    newControl = formGroup as any;
  } else if (control instanceof FormArray) {
    const formArray = new FormArray([], control.validator, control.asyncValidator);

    control.controls.forEach(formControl => formArray.push(cloneAbstractControl(formControl)))

    newControl = formArray as any;
  } else if (control instanceof FormControl) {
    newControl = new FormControl(control.value, control.validator, control.asyncValidator) as any;
  } else {
    throw new Error('Error: unexpected control value');
  }

  if (control.disabled) {
    newControl.disable({emitEvent: false});
  }

  return newControl;
}

// Get control is valid
export function isFieldValid(form: FormGroup, field: string): boolean {
  return !form.get(field).valid && form.get(field).touched;
}

/**
 *Toggle all input
*/
export function  touchAllInput(form: AbstractControl | FormControl | FormGroup | FormArray, loop: boolean = false): void {
  if (form instanceof FormControl) {
    form.markAsDirty();
    form.markAsTouched();
    form.updateValueAndValidity({emitEvent: false});
  }
  if (form instanceof FormGroup) {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control instanceof FormControl) {
        touchAllInput(control, loop);
      }
      if (control instanceof FormArray && loop) {
        const controlArray = control as FormArray;
        for (const controlGroup of controlArray.controls) {
          touchAllInput(controlGroup, loop);
        }
      }
      if (control instanceof FormGroup && loop) {
        touchAllInput(control, loop);
      }
    });
  }
  if (form instanceof FormArray) {
    for (const controlGroup of form.controls) {
      touchAllInput(controlGroup, loop);
    }
  }
}

/**
 * Build form from an object
 */
export function getFormGroupFromObj(data): FormGroup {
  const form = new FormGroup({});
  Object.keys(data).forEach(key => {
    form.addControl(key, new FormControl(data[key]));
  });
  return form;
}

/**
 * Check if formControl is required
 * @param abstractControl
 */
export function hasRequiredField(abstractControl: AbstractControl): boolean {
  if (abstractControl.validator) {
    const validator = abstractControl.validator({}as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }
  if (abstractControl['controls']) {
    for (const controlName in abstractControl['controls']) {
      if (abstractControl['controls'][controlName]) {
        if (hasRequiredField(abstractControl['controls'][controlName])) {
          return true;
        }
      }
    }
  }
  return false;
}

export function isControlValid(control: FormControl | AbstractControl): boolean {
  return !((control.dirty || control.touched) && control.invalid);
}
