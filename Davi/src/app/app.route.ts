import { RouterModule } from '@angular/router';

const APP_ROUTING = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    useHash: true
  },
  {
    path: '**',
    redirectTo: '/',
    useHash: true
  }
];
export const routing = RouterModule.forRoot(APP_ROUTING);
