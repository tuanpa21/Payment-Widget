import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {forkJoin} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {CURRENCY, PROJECT_KEY} from 'src/api/api-constant';
import {PaymentApiService} from 'src/api/payment-api.service';
import {touchAllInput} from 'src/forms/reactive-form';
import {ICountry} from 'src/model/country';
import {IPaymentMethodRequest, IPaymentMethodResponse} from 'src/model/payment-method';
import {PaymentResultComponent} from 'src/pages/payment-result/payment-result.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  listCountry: ICountry[] = [];
  tempCountry: ICountry[] = [];
  listPaymentMethods: IPaymentMethodResponse[] = [];
  listCurrency: string[] = [...CURRENCY];
  paymentForm: FormGroup;

  filterCountry: FormControl = new FormControl();
  openDialog = false;

  constructor(
    private paymentService: PaymentApiService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.getListCountry();
    this.getPaymentMethod();
    this.onFilterCountry();
  }

  initForm(): void {
    this.paymentForm = this.fb.group({
      amount: ['', Validators.required],
      currency: ['', Validators.required],
      country: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      cardForm: this.fb.group({
        cardName: ['', Validators.required],
        cardNumber: ['', Validators.required],
        expire: ['', Validators.required],
        cvv: ['', Validators.required]
      })
    });
  }

  getListCountry(): void {
    forkJoin(
      this.paymentService.getListCountry(),
      this.paymentService.getCurrentCountry()
    ).subscribe(([list, current]) => {
      this.listCountry = list;
      this.tempCountry = list;
      this.paymentForm.get('country').setValue(current);
    });
  }

  getPaymentMethod(): void {
    this.paymentForm.get('country').valueChanges.pipe(distinctUntilChanged()).subscribe(country => {
      this.paymentForm.get('paymentMethod').reset();
      const params: IPaymentMethodRequest = {
        country_code: country,
        key: PROJECT_KEY
      };
      this.paymentService.getPaymentMethod(params).subscribe(res => this.listPaymentMethods = res ? res : []);
    });
  }

  onFilterCountry() {
    this.filterCountry.valueChanges.pipe(debounceTime(500)).subscribe(val => {
      this.getListTempCountry(val);
    });
  }

  getListTempCountry(value: string) {
    if (!value) {
      this.tempCountry = this.listCountry;
      return;
    }
    if (value) {
      value = value.toLocaleLowerCase().trim();
    }
    this.tempCountry = this.listCountry.filter(country => {
      const filterValue = country.name.toLocaleLowerCase().trim();
      return filterValue.indexOf(value) > -1;
    });
  }

  onSubmit() {
    touchAllInput(this.paymentForm, true);
    if (this.paymentForm.invalid) {
      return;
    }
    const dialogRef = this.dialog.open(PaymentResultComponent, {
      width: '500px',
      height: '175px'
    });
    this.openDialog = true;
    dialogRef.afterClosed().subscribe(() => {
      this.openDialog = false;
      this.paymentForm.reset();
    });
  }

  get cardForm(): FormGroup {
    return this.paymentForm.get('cardForm') as FormGroup;
  }
}
