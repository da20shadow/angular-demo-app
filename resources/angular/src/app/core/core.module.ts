import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {RouterModule} from "@angular/router";
import { PublicNavigationComponent } from './components/header/components/public-navigation/public-navigation.component';
import { PrivateNavigationComponent } from './components/header/components/private-navigation/private-navigation.component';
import { NavLinksComponent } from './components/header/components/nav-links/nav-links.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PublicNavigationComponent,
    PrivateNavigationComponent,
    NavLinksComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [HeaderComponent,FooterComponent]
})
export class CoreModule { }
