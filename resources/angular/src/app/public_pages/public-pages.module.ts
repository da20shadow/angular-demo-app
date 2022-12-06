import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoAccessComponent } from './no-access/no-access.component';


@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    NoAccessComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [HomeComponent,NotFoundComponent,NoAccessComponent]
})
export class PublicPagesModule { }
