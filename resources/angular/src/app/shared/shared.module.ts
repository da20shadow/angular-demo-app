import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { EditTaskModalComponent } from './components/edit-task-modal/edit-task-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import {MatSortModule} from "@angular/material/sort";
import {RouterModule} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    HeaderTitleComponent,
    EditTaskModalComponent,
    AddTaskModalComponent,
    TasksListComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatDialogModule,
    MatSortModule,
    RouterModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [HeaderTitleComponent, EditTaskModalComponent, TasksListComponent]
})
export class SharedModule { }
