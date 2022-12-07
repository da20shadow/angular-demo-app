import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./public_pages/home/home.component";
import {FaqComponent} from "./public_pages/faq/faq.component";
import {NotFoundComponent} from "./public_pages/not-found/not-found.component";
import {NoAccessComponent} from "./public_pages/no-access/no-access.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {isLoggedInGuardFn} from "./shared/guards/isLoggedInGuardFn";

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'no-access', component: NoAccessComponent},
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then(m => m.UserModule),
    canActivate: [isLoggedInGuardFn],
    canLoad: [isLoggedInGuardFn]
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
