import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class AdminPanelService {
  baseUrl = environment.apiUrl;
  headers = new Headers();

  constructor(private http: Http) { }

  saveAdminData(adminData: any) {
    return this.http.post(this.baseUrl + 'admin/admin.php', adminData, {headers: this.headers});
  }

  getDataByRole(userRole: string) {
    return this.http.get(this.baseUrl + 'admin/get_data_by_state.php?state=' + userRole, {headers: this.headers});
  }

  updateItems(items: any) {
    return this.http.post(this.baseUrl + 'admin/update.php', items, {headers: this.headers});
  }

  deleteItem(coinname: string) {
    return this.http.delete(this.baseUrl + 'admin/delete.php?coinname=' + coinname, {headers: this.headers});
  }

  getDashItemsByRole(userRole: string) {
    return this.http.get(this.baseUrl + 'admin/getdashitems.php?state=' + userRole, {headers: this.headers});
  }
}
