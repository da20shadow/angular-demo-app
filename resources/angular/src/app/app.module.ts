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
import {authReducer} from "./auth/Store/auth.reducer";
import {AuthEffect} from "./auth/Store/auth.effect";
import {goalsReducer} from "./goals/Store/goals.reducers";
import {GoalsEffects} from "./goals/Store/goals.effects";
import {APP_BASE_HREF} from "@angular/common";
import {extModules} from "./build-specifics";


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
    StoreModule.forRoot({
      user: authReducer,
      goals: goalsReducer,
    }, {}),
    EffectsModule.forRoot([
      AuthEffect,
      GoalsEffects
    ]),
    extModules,
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
