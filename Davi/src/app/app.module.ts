import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { AuthGuard } from './shared/services/auth-guard.service';
import { AppComponent } from './app.component';
import { routing } from './app.route';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';

import {
  TokenService,
  UserService,
  HttpService
} from './shared/services';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    SharedModule,
    AuthModule,
    HomeModule,
    rootRouting,
    routing
    /*StoreModule.provideStore({ items, users, widgets })*/
  ],
  providers: [
    AuthGuard,
    TokenService,
    UserService,
    HttpService,
    [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
