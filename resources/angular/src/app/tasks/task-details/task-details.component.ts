import {Component, Inject} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {goalsSelectors, tasksSelectors} from "../../Store/app.state";
import {GoalPageActions} from "../../Store/goals-store/goals-page.actions";
import {Observable} from "rxjs";
import {Task} from "../../core/models";
import {TaskPageActions} from "../../Store/tasks-store/tasks-page.actions";
import {NgForm} from "@angular/forms";
import {AddTaskModalComponent} from "../../shared/components/add-task-modal/add-task-modal.component";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {

  task$!: Observable<Task|undefined>;
  editTask: boolean = false;

  constructor(private title: Title,
              private dialog: MatDialog,
              private store$: Store) {
    //TODO: add the task title as title of the page!
    this.title.setTitle('Task - GoalsApp');
    this.task$ = this.store$.select(tasksSelectors.activeTask);
  }


  openAddNewTaskModal(taskId: number | null | undefined) {
    if (!taskId){return;}

    this.dialog.open(AddTaskModalComponent,{
      panelClass: 'modal',
      minWidth: 340,
      width: '75%',
      data: {parentInfo: {taskId}}
    });
  }

  editTaskFormHandler(editTaskForm: NgForm) {
    if (editTaskForm.invalid){return;}
    if (editTaskForm.invalid){alert('Invalid Form Fields!'); return;}
    const changedTask = editTaskForm.value;
    this.store$.dispatch(TaskPageActions.updateSubtask({
      taskId: changedTask.id,
      previousTaskStatus:changedTask.previousTaskStatus,
      changedTask }));
    this.editTask = false;
  }
}
