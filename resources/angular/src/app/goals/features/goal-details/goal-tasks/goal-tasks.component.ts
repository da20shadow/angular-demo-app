import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task, Status, Priority} from "../../../../core/models";
import {Sort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskModalComponent} from "../../../../shared/components/edit-task-modal/edit-task-modal.component";
import {tap} from "rxjs";

@Component({
  selector: 'app-goal-tasks',
  templateUrl: './goal-tasks.component.html',
  styleUrls: ['./goal-tasks.component.scss']
})
export class GoalTasksComponent {

  @Input()
  tasksList: Task[] = [];
  @Output()
  updateTaskById: EventEmitter<any> = new EventEmitter();

  taskStatuses = Object.values(Status);
  taskPriority = Object.values(Priority);

  showStartDateInput: boolean = false;
  showEndDateInput: boolean = false;

  constructor(private dialog: MatDialog) {
  }

  updateTaskId(taskId: number | undefined, type: string,
               field: string) {
    if (taskId == undefined) {
      return;
    }
    const data = {taskId, task: {[type]: field}};
    this.updateTaskById.emit(data);
  }

  changePriority() {
    alert('change priority!')
  }

  changeStartDate() {
    this.showStartDateInput = true;
    alert('change start date')
  }

  changeEndDate() {
    alert('change end date')
  }

  editTask(task: Task) {

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
    // this.dialog.afterAllClosed.subscribe(data => {
    //   console.log('Edited Task: ',data)
    // })
  }

  deleteTask(task: Task) {
    alert('delete task')
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

function compare(a: number | Priority | string | undefined, b: number | Priority | string | undefined, isAsc: boolean) {
  if (a === undefined || b === undefined) {
    return 0
  }
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
