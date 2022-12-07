import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GoalDetailsComponent} from "./goal-details.component";

const routes: Routes = [
  {path: '', component: GoalDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalDetailsRoutingModule { }
