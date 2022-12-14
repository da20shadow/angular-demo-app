import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {PublicPagesModule} from "./public_pages/public-pages.module";

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {AuthModule} from "./auth/auth.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JWTInterceptorService} from "./auth/interceptors/jwt-interceptor";
import {APP_BASE_HREF} from "@angular/common";
import {extModules} from "./build-specifics";
import {SharedAppStateModule} from "./Store/app.state";
import {GoalsApiEffects} from "./Store/goals-store/goals-api.effects";
import {GoalService} from "./goals/services/goal.service";
import {UserApiEffects} from "./Store/user-store/user-api.effects";
import {routerReducer, StoreRouterConnectingModule} from "@ngrx/router-store";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    PublicPagesModule,
    AuthModule,
    AppRoutingModule,
    SharedAppStateModule,
    StoreModule.forRoot( {
      router: routerReducer,
    }),
    EffectsModule.forRoot([
      GoalsApiEffects,
      UserApiEffects,
    ]),
    StoreRouterConnectingModule.forRoot(),
    extModules,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptorService,
      multi: true
    },
    {provide: APP_BASE_HREF, useValue: '/assets/angular/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
