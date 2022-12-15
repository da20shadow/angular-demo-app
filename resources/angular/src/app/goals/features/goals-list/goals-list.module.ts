import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GoalsListRoutingModule} from './goals-list-routing.module';
import {GoalsListComponent} from './goals-list.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    GoalsListComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatTooltipModule,
    RouterModule,
    GoalsListRoutingModule,
    SharedModule
  ]
})
export class GoalsListModule {
}
