import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'angular4-social-login';
import { SocialUser } from 'angular4-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';

import { UserService } from '../service/user.service';
import { AlertService } from '../service/alert.service';
import { AuthInterface } from './auth.interface';
import { PasswordResetInterface } from './password-reset.interface';

export interface FormModel {
    captcha?: string;
}
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
    public model: AuthInterface;
    public resetModel: PasswordResetInterface;
    user: SocialUser;
    public formModel: FormModel = {};

    constructor(
        private router: Router,
        private authService: AuthService,
        private userService: UserService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.model = {
            identify: '',
            password: ''
        };
        this.resetModel = {
            email: '',
            resetPassword: '',
            confirmResetPassword: ''
        };
        this.authService.authState.subscribe((user) => {
            this.user = user;
        });
    }

    ngAfterViewInit() {
        $(function() {
            $('.preloader').fadeOut();
        });
        $(function() {
            (<any>$('[data-toggle="tooltip"]')).tooltip();
        });
        $('#to-recover').on('click', function() {
            $('#loginform').slideUp();
            $('#recoverform').fadeIn();
        });
    }

    onSignIn(identifyData: any) {
        this.userService.signIn(identifyData.identify, identifyData.password)
                        .subscribe(response => {
                            const status = response.json().status;
                            if (status === 'success') {
                                this.router.navigateByUrl('/dashboard');
                                localStorage.setItem('isLoggedin', 'true');
                                const data = response.json().data;
                                localStorage.setItem('username', data.username);
                                localStorage.setItem('user_role', data.user_role);
                            } else {
                                this.alertService.error(response.json().message);
                            }
                        });
    }
    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
                        .then((user) => {
                            this.user = user;
                            this.router.navigateByUrl('/dashboard');
                            localStorage.setItem('isLoggedin', 'true');
                        })
                        .catch((error) => {
                            this.alertService.error(error.message);
                        }) ;
    }
    signInWithGoogle() {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
                        .then((user) => {
                            this.user = user;
                            this.router.navigateByUrl('/dashboard');
                            localStorage.setItem('isLoggedin', 'true');
                        })
                        .catch((error) => {
                            this.alertService.error(error.message);
                        }) ;
    }

    onResetPassword(data: any) {
        this.userService.resetPassword(data)
                        .subscribe(response => {
                            const status = response.json().status;
                            if (status === 'success') {
                                this.alertService.success(response.json().message);
                            } else {
                                this.alertService.error(response.json().message);
                            }
                        });
    }
}
