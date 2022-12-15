import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/goals-list/goals-list.module').then(m => m.GoalsListModule),
    pathMatch: 'full',
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./features/goal-details/goal-details.module').then(m => m.GoalDetailsModule),
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalsRoutingModule { }
