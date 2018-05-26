import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { environment } from '../../environments/environment';
import { User } from '../model/user';

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl ;
  headers = new Headers();

  constructor(private http: Http) {}

  signUp(user: User) {
    return this.http.post(this.baseUrl + 'user/signup.php', user, {headers: this.headers});
  }

  signIn(identify: string, password: string) {
    return this.http.get(this.baseUrl + 'user/signin.php' + '?identify=' + identify + '&password=' + password, {headers: this.headers});
  }

  resetPassword(data: any) {
    return this.http.post(this.baseUrl + 'user/recover_password.php', data, {headers: this.headers});
  }
}
