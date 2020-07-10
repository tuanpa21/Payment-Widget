import { AbstractControl } from '@angular/forms';

const date = new Date();

export function cardNumberValidator(control: AbstractControl): { [key: string]: any } | null {

  if (/[^0-9-\s]+/.test(control.value)) { return { incorrectCardNumber: true }; }

  // The Luhn Algorithm.
  let nCheck = 0, bEven = false;
  const value = control.value.replace(/\D/g, '');

  for (let n = value.length - 1; n >= 0; n--) {
    let cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) { nDigit -= 9; }

    nCheck += nDigit;
    bEven = !bEven;
  }
  return (nCheck % 10) === 0 ? null : { incorrectCardNumber: true };
}

export function cardExpDateValidator(control: AbstractControl): { [key: string]: any } | null {
  if (!/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(control.value)) { return { incorrectExpDate: true }; }

  const month = control.value.split('/')[0],
    year = 20 + control.value.split('/')[1];
  const newDate = new Date(year, month);

  return newDate > date ? null : { incorrectExpDate: true };
}
