import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/services';
import { NotFoundComponent } from './not-found/not-found.component';

const APP_ROUTING = [
  { path: '', redirectTo: 'login', pathMatch: 'full', useHash: true},
/*  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], useHash: true},*/
  { path: '**', redirectTo: '', component: NotFoundComponent, useHash: true}
];
export const routing = RouterModule.forRoot(APP_ROUTING);

