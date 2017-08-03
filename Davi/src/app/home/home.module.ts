import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { HomeComponent } from './home.component';
/*import { AuthGuard } from '../shared/services';*/

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'home',
    component: HomeComponent/*,
    canActivate: [AuthGuard]*/
    /*resolve: {
      isAuthenticated: HomeAuthResolver
    }*/
  }
]);

@NgModule({
  imports: [
    CommonModule,
    homeRouting
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
