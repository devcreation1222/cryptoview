import { TestBed, inject } from '@angular/core/testing';

import { CoinMarketService } from './coin-market.service';

describe('CoinMarketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoinMarketService]
    });
  });

  it('should be created', inject([CoinMarketService], (service: CoinMarketService) => {
    expect(service).toBeTruthy();
  }));
});
