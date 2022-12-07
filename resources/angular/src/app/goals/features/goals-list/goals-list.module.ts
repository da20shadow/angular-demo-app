import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsListRoutingModule } from './goals-list-routing.module';
import { GoalsListComponent } from './goals-list.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    GoalsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GoalsListRoutingModule
  ]
})
export class GoalsListModule { }
