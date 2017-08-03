import { NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AuthComponent } from './auth.component';
/*import { AuthGuard } from '../shared/services/auth-guard.service';*/
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { SharedModule } from '../shared';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: AuthComponent,
    // canActivate: [NoAuthGuard]
  }
]);

@NgModule({
  imports: [
    CommonModule,
    authRouting,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [ AuthComponent ],
  providers: [
    CookieService
  ]
})
export class AuthModule { }
