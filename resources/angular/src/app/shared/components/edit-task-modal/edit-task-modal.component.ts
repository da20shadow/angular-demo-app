import {Component, Inject, Input} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GlobalClasses} from "../../constants/Global-Classes";
import {Store} from "@ngrx/store";
import {GoalPageActions} from "../../../Store/goals-store/goals-page.actions";

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss']
})
export class EditTaskModalComponent {

  task;
  classes = GlobalClasses;

  constructor(
    private store$: Store,
    private dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {

    this.task = data.task;
  }

  editTaskFormHandler(editTaskForm: NgForm) {
    if (editTaskForm.invalid){return;}
    const task = editTaskForm.value;
    this.store$.dispatch(GoalPageActions.updateTask({taskId: this.task.id, task}))

    //TODO: send the date to the goal details component if possible
    // this.dialogRef.close(editTaskForm.value);
  }
}
