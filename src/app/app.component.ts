import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {forkJoin} from 'rxjs';
import {PaymentApiService} from 'src/api/payment-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  listCountry = [];
  paymentForm: FormGroup;

  constructor(
    private paymentService: PaymentApiService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
  }

  initForm(): void {
    this.paymentForm = this.fb.group({
      country: [''],

    });
  }

  getListCountry(): void {
    forkJoin(
      this.paymentService.getListCountry(),
      this.paymentService.getCurrentCountry()
    ).subscribe(([list, current]) => {
      this.listCountry = list;

    });
  }
}
