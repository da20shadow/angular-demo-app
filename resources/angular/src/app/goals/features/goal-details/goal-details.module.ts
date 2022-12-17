import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GoalDetailsRoutingModule} from './goal-details-routing.module';
import {GoalDetailsComponent} from './goal-details.component';
import {SharedModule} from "../../../shared/shared.module";
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from "@angular/forms";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    GoalDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    GoalDetailsRoutingModule,
    SharedModule,
  ],
})
export class GoalDetailsModule {
}
