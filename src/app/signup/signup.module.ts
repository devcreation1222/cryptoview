import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecaptchaModule, RecaptchaLoaderService } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { UserService } from '../service/user.service';
import { AlertService } from '../service/alert.service';

import { EqualValidatorDirective } from './equal-validator.directive';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    SignupRoutingModule
  ],
  declarations: [
    SignupComponent,
    EqualValidatorDirective
  ],
  providers: [
    UserService,
    AlertService,
    RecaptchaLoaderService
  ]
})
export class SignupModule { }
