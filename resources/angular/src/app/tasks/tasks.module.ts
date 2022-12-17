import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import {TaskDetailsComponent} from "./task-details/task-details.component";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSortModule} from "@angular/material/sort";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    TaskDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatSortModule,
    TasksRoutingModule,
    SharedModule
  ]
})
export class TasksModule { }
