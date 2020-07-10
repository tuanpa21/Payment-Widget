import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {API_COUNTRY, API_CURRENT_COUNTRY, API_PAYMENT_METHOD, PROJECT_KEY, USER_ID} from 'src/api/api-constant';
import {ICountry, IDetectCountry} from 'src/model/country';
import {IPaymentMethodRequest, IPaymentMethodResponse} from 'src/model/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PaymentApiService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getListCountry(): Observable<ICountry[]> {
    return this.httpClient.get<ICountry[]>(API_COUNTRY);
  }

  getCurrentCountry(): Observable<IDetectCountry | string> {
    const param = { uid: USER_ID };
    return this.httpClient.get<IDetectCountry>(API_CURRENT_COUNTRY + this.getQueryParams(param))
    .pipe(map((response) => response.code));
  }

  getPaymentMethod(params: IPaymentMethodRequest): Observable<IPaymentMethodResponse[]> {
    let queryParams = `?key=${PROJECT_KEY}`;
    Object.entries(params).forEach(([key, value]) => {
      queryParams = `${queryParams}&${key}=${value}`;
    });
    return this.httpClient.get<IPaymentMethodResponse[]>(`${API_PAYMENT_METHOD}${this.getQueryParams(params)}`);
  }

  getQueryParams(params): string {
    let queryParams = `?key=${PROJECT_KEY}`;
    Object.entries(params).forEach(([key, value]) => {
      queryParams = `${queryParams}&${key}=${value}`;
    });
    return queryParams;
  }
}
