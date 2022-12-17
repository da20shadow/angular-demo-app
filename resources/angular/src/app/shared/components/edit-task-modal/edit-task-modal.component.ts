import {Component, Inject, Input} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GlobalClasses} from "../../constants/Global-Classes";
import {Store} from "@ngrx/store";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TaskPageActions} from "../../../Store/tasks-store/tasks-page.actions";

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        opacity: 0.5,
        backgroundColor: 'blue'
      })),
      transition('closed => open', [
        animate('1.5s')
      ]),
    ]),
  ]
})
export class EditTaskModalComponent {

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  task;
  classes = GlobalClasses;

  constructor(
    private store$: Store,
    private dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {

    this.task = data.task;
  }

  editTaskFormHandler(editTaskForm: NgForm) {
    if (editTaskForm.invalid) {
      return;
    }
    this.toggle();
    const task = editTaskForm.value;
    this.store$.dispatch(TaskPageActions.updateSubtask({taskId: this.task.id,previousTaskStatus:task.status , changedTask:task}))
  }
}
