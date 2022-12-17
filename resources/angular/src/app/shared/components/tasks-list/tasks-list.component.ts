import {Component, Input} from '@angular/core';
import {Priority, Status, Task} from "../../../core/models";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskModalComponent} from "../edit-task-modal/edit-task-modal.component";
import {tap} from "rxjs";
import {Sort} from "@angular/material/sort";
import {Store} from "@ngrx/store";
import {TaskPageActions} from "../../../Store/tasks-store/tasks-page.actions";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
      })),
      transition('void <=> *', animate(300)),
    ]),
  ]
})
export class TasksListComponent {

  @Input()
  tasksList: Task[] = [];

  taskStatuses = Object.values(Status);
  taskPriority = Object.values(Priority);

  showStartDateInput: boolean = false;
  showEndDateInput: boolean = false;

  constructor(private dialog: MatDialog, private store$: Store) {
  }

  changeStartDate() {
    this.showStartDateInput = true;
    alert('change start date')
    //TODO:
  }

  changeEndDate() {
    alert('change end date')
    //TODO:
  }

  openEditTaskModal(task: Task) {

    this.dialog.open(EditTaskModalComponent,{
      panelClass: 'modal',
      data: {task},
      minWidth: 340,
      width: '75%',
    });

    this.dialog.afterAllClosed.pipe(
      tap(data => {
        console.log('data:',data)
        return data;
      })
    )
  }

  openDeleteTaskModal(task: Task|undefined|null) {
    if (!task){ return; }
    //TODO: implement this delete task modal and process if write DELETE in the input!
    confirm('Are you sure that you want to delete this task?')

    this.store$.dispatch(TaskPageActions.deleteSubtask({task}));
  }

  updateTaskId(taskId: number | null | undefined,
               status: string | Status | null | undefined,
               type: string, field:string) {
    if (!taskId || !type || !field || !status){
      alert('Invalid Task Update Request!');
      return;
    }
    const previousTaskStatus = status
    const changedTask = {id:taskId, [type]: field }
    this.store$.dispatch(TaskPageActions.updateSubtask({taskId,previousTaskStatus,changedTask}));
  }

  sortData(sort: Sort) {
    const data = this.tasksList.slice();
    if (!sort.active || sort.direction === '') {
      this.tasksList = data;
      return;
    }

    this.tasksList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'priority':
          return compare(a.priority, b.priority, isAsc);
        case 'startDate':
          return compare(a.start_date, b.start_date, isAsc);
        case 'endDate':
          return compare(a.end_date, b.end_date, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | Priority | string | undefined|null,
                 b: number | Priority | string | undefined|null, isAsc: boolean) {
  if (!a || !b) { return 0 }
  let isPriority = false;
  switch (a) {
    case Priority.URGENT: a = 1; isPriority = true; break;
    case Priority.HIGH: a = 2; isPriority = true; break;
    case Priority.LOW: a = 3; isPriority = true; break;
    case Priority.NO_PRIORITY: a = 4; isPriority = true; break;
  }
  if (isPriority){
    switch (b) {
      case Priority.URGENT: b = 1; break;
      case Priority.HIGH: b = 2; break;
      case Priority.LOW: b = 3; break;
      case Priority.NO_PRIORITY: b = 4; break;
    }
  }
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
