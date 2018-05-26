import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SortablejsOptions } from 'angular-sortablejs';

import { CoinMarketService } from '../../service/coin-market.service';
import { AdminPanelService } from '../../service/admin-panel.service';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  model: any = {};
  coinname: string;
  cDate: Date;
  price: number;
  percentage: number;
  description: string;
  stateList = [
    {value: 'show', display: 'Show'},
    {value: 'hidden', display: 'Hidden'},
    {value: 'hot', display: 'Hot'},
    {value: 'cold', display: 'Cold'}
  ];
  adminPanel = false;
  createCoinView = true;

  scrollableItems: any;

  scrollableOptions: SortablejsOptions = {
    scroll: true,
    scrollSensitivity: 100,
  };

  username = localStorage.getItem('username');
  userRole = localStorage.getItem('user_role');

  constructor(
    private coinmarketService: CoinMarketService,
    private adminpanelService: AdminPanelService,
    private alertService: AlertService
  ) {
    if (!this.userRole) {
      this.userRole = '0';
    }
    this.adminpanelService.getDataByRole(this.userRole)
                          .subscribe(response => {
                            this.scrollableItems = response.json();
                          });
    this.scrollableOptions = {
      onUpdate: (event: any) => {
        this.adminpanelService.updateItems(this.scrollableItems)
                              .subscribe(response => {
                                console.log(response.json());
                              });
      }
    };
  }

  getData(coinname: any) {
    let coinID = coinname.toLowerCase().replace(' ', '-');
    this.coinmarketService.getDataByName(coinID)
                          .subscribe(
                            response => {
                              let data = response.json();
                              let price = data[0].price_btc;
                              let percentage = ((price / price) - 1) * 100;
                              let currentDate = new Date();
                              let formatDate = currentDate.toISOString().substring(0, 10);
                              this.model = {
                                coinname: coinname,
                                cDate: formatDate,
                                price: price,
                                percentage: percentage,
                                description: null,
                                state: 'show'
                              };
                            },
                            error => {
                              this.alertService.error(error.json().error + '! Please input the Coinname again.');
                            });
  }

  createCoin() {
    this.adminPanel = true;
    this.createCoinView = false;
    $('.view-coin').slideUp();
    $('.create-coin').fadeIn();
    let currentDate = new Date();
    let formatDate = currentDate.toISOString().substring(0, 10);
    this.model = {
      coinname: null,
      cDate: formatDate,
      price: null,
      percentage: null,
      description: null,
      state: 'show'
    };
  }

  goBack() {
    this.adminPanel = false;
    this.createCoinView = true;
    $('.create-coin').slideUp();
    $('.view-coin').fadeIn();
    this.adminpanelService.getDataByRole(this.userRole)
                          .subscribe(response => {
                            this.scrollableItems = response.json();
                          });
  }

  editCoin(coinItem: any) {
    this.adminPanel = true;
    this.createCoinView = false;
    $('.view-coin').slideUp();
    $('.create-coin').fadeIn();
    this.model = {
      coinname: coinItem.coinname,
      cDate: coinItem.c_date,
      price: coinItem.price,
      percentage: coinItem.percentage,
      description: coinItem.description,
      state: coinItem.state
    };
  }

  deleteCoin(coinItem: any) {
    this.alertService.confirm('Are you sure to delete ' + coinItem.coinname, () => {
      let index = this.scrollableItems.indexOf(coinItem);
      this.scrollableItems.splice(index, 1);
      this.adminpanelService.deleteItem(coinItem.coinname)
                          .subscribe(
                            response => {
                              let status = response.json().status;
                              if (status === 'success') {
                                  this.alertService.success(response.json().message);
                              } else {
                                  this.alertService.error(response.json().message);
                              }
                            }
                          );
    });
  }

  saveCoin(data: any) {
    this.adminpanelService.saveAdminData(data)
                          .subscribe(response => {
                            let status = response.json().status;
                            if (status === 'success') {
                                this.alertService.success(response.json().message);
                                this.adminPanel = false;
                                this.createCoinView = true;
                                this.goBack();
                            } else {
                                this.alertService.error(response.json().message);
                            }
                          }, error => {
                            this.alertService.error(error.message);
                          });
  }
}
