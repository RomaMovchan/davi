import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { AuthGuard } from '../shared/services';
import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth.resolver';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard]
    resolve: {
      isAuthenticated: HomeAuthResolver
    }
  }
]);

@NgModule({
  imports: [
    CommonModule,
    homeRouting
  ],
  declarations: [HomeComponent],
  providers: [
    HomeAuthResolver
  ]
})
export class HomeModule { }
