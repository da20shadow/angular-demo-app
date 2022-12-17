import {Injectable} from "@angular/core";
import {TaskService} from "../../tasks/services/task.service";
import {NotificationService} from "../../core/services/notification.service";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {catchError, filter, from, map, mergeMap, of, switchMap} from "rxjs";
import {TaskPageActions} from "./tasks-page.actions";
import {TaskApiActions} from "./tasks-api.actions";
import {tasksSelectors} from "../app.state";
import {ROUTER_NAVIGATION, RouterNavigatedAction} from "@ngrx/router-store";

@Injectable()
export class TasksApiEffects {
  constructor(private taskService: TaskService,
              private notificationService: NotificationService,
              private dialog: MatDialog,
              private store$: Store,
              private actions$: Actions) {
  }

  get$ = createEffect(() => this.actions$.pipe(
    ofType(TaskPageActions.getTaskById),
    concatLatestFrom(() => this.store$.select(tasksSelectors.tasksStateStatus)),
    filter(([action,state]) => state === 'pending'),
    map(() => TaskPageActions.loadTaskById())
  ),{ dispatch: false });

  loadTask$ = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter((r: RouterNavigatedAction) => {
      return r.payload.routerState.url.startsWith('/tasks/');
    }),
    switchMap((route) => {
        const taskId = parseInt(route.payload.routerState.url.replace('/tasks/',''));
        return from(this.taskService.getTaskById(taskId)).pipe(
          map((response) => TaskApiActions.loadTaskByIdSuccess({response})),
          catchError((error) => of(TaskApiActions.loadTaskByIdFailure({error})))
        )
      }
    )
  ));

  addSubTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskPageActions.createSubtask),
    switchMap((action) => {
      return from(this.taskService.addTask(action.task)).pipe(
        map((response) => {
          setTimeout(()=>{ this.dialog.closeAll(); },300);
          this.notificationService.showSuccessNotification(response.message);
            return TaskApiActions.createSubtaskSuccess({response});
        }),
        catchError((error) => {
          this.notificationService.showErrorNotification(error.message);
          return of(TaskApiActions.createSubtaskFailure(error))
        })
      )
    })
  ),{ dispatch: false });


  //TODO when update goal from the task page to not call the updateGoalTaskSuccess!!
  updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskPageActions.updateSubtask),
    switchMap((action) => {
      const previousTaskStatus = action.previousTaskStatus;
      const changedTask = action.changedTask;
      return from(this.taskService.updateTask(action.taskId,changedTask)).pipe(
        map((response) => {
          this.dialog.closeAll();
          this.notificationService.showSuccessNotification(response.message);
            return TaskApiActions.updateSubtaskSuccess({previousTaskStatus,response});
        }),
        catchError((error) => {
          this.notificationService.showErrorNotification(error.message);
          return of(TaskApiActions.updateSubtaskFailure(error))
        })
      )
    })
  ),{ dispatch: false });

  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskPageActions.deleteSubtask),
    mergeMap((action) => {
      const taskStatus = action.task.status;
      return from(this.taskService.deleteTask(action.task.task_id)).pipe(
        map((response) => {
          this.notificationService.showSuccessNotification(response.message);
          return TaskApiActions.deleteSubtaskSuccess({taskStatus,response})
        }),
        catchError((error) => {
          this.notificationService.showErrorNotification(error.message);
          return of(TaskApiActions.deleteSubtaskFailure({error}))
        })
      )
    })
  ),{ dispatch: false })

}
