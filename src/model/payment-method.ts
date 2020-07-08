export interface IPaymentMethodResponse {
  id: string;
  name: string;
  new_window: boolean;
  img_url: string;
  pricepoints?: IPricePoints[];
}

export interface IPricePoints {
  amount: number;
  currency: string;
  currency_converted: string;
  amount_converted: number;
}

export interface IPaymentMethodRequest {
  country_code: string;
  key: string;
  sign?: string;
}
