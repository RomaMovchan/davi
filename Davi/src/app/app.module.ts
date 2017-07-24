import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { TokenService } from './shared/services/token.service';
import { AuthGuard } from './shared/services/auth-guard.service';
import { UserService } from './shared/services/user.service';
import { HttpService } from './shared/services/http.service';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    rootRouting
  ],
  providers: [
    TokenService,
    AuthGuard,
    UserService,
    HttpService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
