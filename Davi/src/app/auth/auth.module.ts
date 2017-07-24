import { NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthGuard } from '../shared/services/auth-guard.service';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [AuthGuard]
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
    authRouting
  ],
  declarations: [ AuthComponent ]
})
export class AuthModule { }
