import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalDetailsRoutingModule } from './goal-details-routing.module';
import { GoalDetailsComponent } from './goal-details.component';


@NgModule({
  declarations: [
    GoalDetailsComponent
  ],
  imports: [
    CommonModule,
    GoalDetailsRoutingModule
  ]
})
export class GoalDetailsModule { }
