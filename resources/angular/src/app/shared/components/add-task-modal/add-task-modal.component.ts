import {Component, Inject} from '@angular/core';
import {GlobalClasses} from "../../constants/Global-Classes";
import {Store} from "@ngrx/store";
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskPageActions} from "../../../Store/tasks-store/tasks-page.actions";
import {GoalPageActions} from "../../../Store/goals-store/goals-page.actions";

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent {
  classes = GlobalClasses;
  parentInfo: any;
  constructor(
    private store$: Store,
    private dialogRef: MatDialogRef<AddTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.parentInfo = data.parentInfo;
  }

  addTaskFormHandler(addTaskForm: NgForm) {
    if (addTaskForm.invalid) {
      alert('Invalid Form Fields!')
      return;
    }
    const formData = addTaskForm.value;
    formData.task_id = this.parentInfo.taskId;
    formData.goal_id = this.parentInfo.goalId;

    console.log('task: ',formData)
    console.log('parentInfo:' , this.parentInfo)
    console.log('parentInfo.goalId:' , this.parentInfo.goalId)
    console.log('parentInfo.taskId:' , this.parentInfo.taskId)

    if (formData.goal_id !== undefined) {
      console.log('calling GaolPageAction')
      formData.goal_id = this.parentInfo.goalId;
      this.store$.dispatch(GoalPageActions.addTask({task:formData}));
    } else if (formData.task_id !== undefined) {
      console.log('calling TaskPageAction')
      formData.task_id = this.parentInfo.taskId;
      this.store$.dispatch(TaskPageActions.createSubtask({task:formData}))
    }else {
      this.store$.dispatch(GoalPageActions.createGoal({goal: formData}))
    }
  }
}
