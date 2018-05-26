import { Component, AfterViewInit, OnInit } from '@angular/core';

import { AdminPanelService } from '../../service/admin-panel.service';
import { CoinMarketService } from '../../service/coin-market.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent {
    user_role = localStorage.getItem('user_role');
    isAdmin = false;
    gridView = false;
    adminItems: any;

    constructor(
        private adminpanelService: AdminPanelService,
        private coinmarketService: CoinMarketService
    ) {
        this.isAdmin = this.user_role === '1' ? true : false;

        if (!this.user_role) {
            this.user_role = '0';
        }

        this.adminpanelService.getDashItemsByRole(this.user_role)
                            .subscribe(response => {
                                this.adminItems = response.json();
                                $(function() {
                                    $('.preloader').fadeOut();
                                });
                            }, error => {
                                console.log(error);
                            });

        $(function() {
            $('#responsive-modal').on('hidden.bs.modal', (e) => {
                location.reload();
            });
        });
    }

    changeView = function() {
        this.gridView = this.gridView === false ? true : false;
        if (this.gridView) {
            $('.gridview').slideUp();
            $('.listview').fadeIn();
        } else {
            $('.listview').slideUp();
            $('.gridview').fadeIn();
        }
    };
}
