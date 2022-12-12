import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./public_pages/home/home.component";
import {FaqComponent} from "./public_pages/faq/faq.component";
import {NotFoundComponent} from "./public_pages/not-found/not-found.component";
import {NoAccessComponent} from "./public_pages/no-access/no-access.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {isLoggedInGuardFn} from "./shared/guards/isLoggedInGuardFn";
import {LogoutComponent} from "./auth/logout/logout.component";
import {ContactUsComponent} from "./public_pages/contact-us/contact-us.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'no-access', component: NoAccessComponent},
  {
    path: 'profile',
    loadChildren: () =>
      import('./user/user.module').then(m => m.UserModule),
    canActivate: [isLoggedInGuardFn],
    canLoad: [isLoggedInGuardFn]
  },
  {
    path: 'goals',
    loadChildren: () =>
      import('./goals/goals.module').then(m => m.GoalsModule),
    canActivate: [isLoggedInGuardFn],
    canLoad: [isLoggedInGuardFn],
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
