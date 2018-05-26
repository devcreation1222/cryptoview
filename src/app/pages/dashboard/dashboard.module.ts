import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSlideshowModule } from 'ngx-slideshow';
import { SortablejsModule } from 'angular-sortablejs';

import { DashboardComponent } from './dashboard.component';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { CoinMarketService } from '../../service/coin-market.service';
import { AdminPanelService } from '../../service/admin-panel.service';
import { AlertService } from '../../service/alert.service';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Dashboard Page',
    urls: [{title: 'Dashboard', url: '/'}, {title: 'Dashboard Page'}]
  },
  component: DashboardComponent
}];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SortablejsModule,
    NgxSlideshowModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent,
    AdminPanelComponent
  ],
  providers: [
    CoinMarketService,
    AdminPanelService,
    AlertService
  ]
})
export class DashboardModule {}
