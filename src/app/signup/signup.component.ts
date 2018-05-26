import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AlertService } from '../service/alert.service';
import { UserInterface } from './user.interface';

export interface FormModel {
    captcha?: string;
}
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    providers: [UserService, AlertService]
})

export class SignupComponent implements OnInit, AfterViewInit {
    public model: UserInterface;
    public formModel: FormModel = {};

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.model = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    ngAfterViewInit() {
        $(function() {
            $('.preloader').fadeOut();
        });
    }

    onSignup(userData: any, isValid: boolean) {
        this.userService.signUp(userData)
                        .subscribe(response => {
                            let status = response.json().status;
                            if (status === 'success') {
                                this.alertService.success(response.json().message);
                                this.router.navigateByUrl('/signin');
                            } else {
                                this.alertService.error(response.json().message);
                            }
                        }, error => {
                            this.alertService.error(error.message);
                        });
    }
}
