import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule } from 'angular4-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';
import { RecaptchaModule, RecaptchaLoaderService } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { UserService } from '../service/user.service';
import { AlertService } from '../service/alert.service';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { EqualValidatorDirective } from './equal-validator.directive';

const config = new AuthServiceConfig([
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('171102540191227')
    },
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('571776536233-8uefbmi7bv3nvss7j30mi5s6nc4hpc0u.apps.googleusercontent.com')
    }
]);

export function provideConfig() {
    return config;
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        LoginRoutingModule,
        SocialLoginModule
    ],
    declarations: [
        LoginComponent,
        EqualValidatorDirective
    ],
    providers: [
        UserService,
        AlertService,
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        },
        RecaptchaLoaderService
    ]
})
export class LoginModule {}
