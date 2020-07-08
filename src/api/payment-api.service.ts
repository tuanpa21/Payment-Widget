import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {API_COUNTRY, API_PAYMENT_METHOD, PROJECT_KEY} from 'src/api/api-constant';
import {ICountry} from 'src/model/country';
import {IPaymentMethodRequest, IPaymentMethodResponse} from 'src/model/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PaymentApiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getListCountry(): Observable<ICountry[]> {
    return this.httpClient.get<ICountry[]>(API_COUNTRY);
  }

  getPaymentMethod(params: IPaymentMethodRequest): Observable<IPaymentMethodResponse[]> {
    let queryParams = `?key=${PROJECT_KEY}`;
    Object.entries(params).forEach(([key, value]) => {
      queryParams = `${queryParams}&${key}=${value}`;
    });
    return this.httpClient.get<IPaymentMethodResponse[]>(`${API_PAYMENT_METHOD}${queryParams}`);
  }
}
