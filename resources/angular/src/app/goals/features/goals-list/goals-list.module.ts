import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsListRoutingModule } from './goals-list-routing.module';
import { GoalsListComponent } from './goals-list.component';


@NgModule({
  declarations: [
    GoalsListComponent
  ],
  imports: [
    CommonModule,
    GoalsListRoutingModule
  ]
})
export class GoalsListModule { }
