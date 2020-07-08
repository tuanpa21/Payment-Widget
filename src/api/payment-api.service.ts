import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {API_COUNTRY, API_CURRENT_COUNTRY, API_PAYMENT_METHOD, PROJECT_KEY} from 'src/api/api-constant';
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
    return this.httpClient.get<IDetectCountry>(API_CURRENT_COUNTRY)
    .pipe(map((response) => response.countryCode));
  }

  getPaymentMethod(params: IPaymentMethodRequest): Observable<IPaymentMethodResponse[]> {
    let queryParams = `?key=${PROJECT_KEY}`;
    Object.entries(params).forEach(([key, value]) => {
      queryParams = `${queryParams}&${key}=${value}`;
    });
    return this.httpClient.get<IPaymentMethodResponse[]>(`${API_PAYMENT_METHOD}${queryParams}`);
  }
}
