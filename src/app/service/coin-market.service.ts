import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class CoinMarketService {
  coinmarketApiUrl = 'https://api.coinmarketcap.com/v1/ticker/';
  headers = new Headers();

  constructor(private http: Http) { }

  getDataByName(coinname: string) {
    return this.http.get(this.coinmarketApiUrl + coinname + '/?convert=EUR', {headers: this.headers});
  }

  getAll() {
    return this.http.get(this.coinmarketApiUrl, {headers: this.headers});
  }
}
