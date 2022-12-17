import {Injectable} from "@angular/core";
import {GoalService} from "../../goals/services/goal.service";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {GoalPageActions} from "./goals-page.actions";
import {goalsSelectors} from "../app.state";
import {catchError, concatMap, filter, from, map, mergeMap, of, switchMap} from "rxjs";
import {GoalApiActions} from "./goals-api.actions";
import {ROUTER_NAVIGATION, RouterNavigatedAction} from "@ngrx/router-store";
import {NotificationService} from "../../core/services/notification.service";
import {MatDialog} from "@angular/material/dialog";
import {TaskService} from "../../tasks/services/task.service";

@Injectable()
export class GoalsApiEffects {
  constructor(private goalService: GoalService,
              private taskService: TaskService,
              private notificationService: NotificationService,
              private dialog: MatDialog,
              private store$: Store,
              private actions$: Actions) {
  }

  get$ = createEffect(() => this.actions$.pipe(
    ofType(GoalPageActions.get),
    concatLatestFrom(() => this.store$.select(goalsSelectors.goalsStateStatus)),
    filter(([action,state]) => state === 'pending'),
    map(() => GoalPageActions.loadGoals())
  ));

  loadGoals$ = createEffect(() => this.actions$.pipe(
    ofType(GoalPageActions.loadGoals),
      switchMap(() =>
        this.goalService.getAllGoals().pipe(
        map((goals) => GoalApiActions.loadSuccess({goals })),
          catchError((error) => of(GoalApiActions.loadFailure({error})))
        )
      ),
    )
  );

  createGaol$ = createEffect(() => this.actions$.pipe(
    ofType(GoalPageActions.createGoal),
    concatMap((action) =>
      from(this.goalService.saveGoal(action.goal)).pipe(
        map((response) => {
          this.notificationService.showSuccessNotification(response.message)
          setTimeout(()=>{ this.dialog.closeAll(); },300);
          return GoalApiActions.createSuccess({response})
        }),
        catchError((error) => {
          this.notificationService.showErrorNotification(error.error.message)
          return of(GoalApiActions.createFailure({error}))
        })
      ))
  ));

  updateGoal$ = createEffect(() => this.actions$.pipe(
    ofType(GoalPageActions.updateGoal),
    concatMap((action) =>
      from(this.goalService.updateGoal(action.goalId,action.changed)).pipe(
        map((response) => {
          this.notificationService.showSuccessNotification(response.message);
          return GoalApiActions.updateSuccess({response})
        }),
        catchError((error) => {
          this.notificationService.showErrorNotification(error.message);
          return of(GoalApiActions.updateFailure({error}))
        })
      ))
  ));

  deleteGoal$ = createEffect(() => this.actions$.pipe(
    ofType(GoalPageActions.deleteGoal),
    mergeMap((action) =>
      from(this.goalService.deleteGoal(action.goalId)).pipe(
        map((response) => {
          return GoalApiActions.deleteSuccess({response})
        }),
        catchError((error) => of(GoalApiActions.deleteFailure({error})))
      ))
  ))

  //TODO: To delete if not used anymore!

  // setActiveGoalByClick$ = createEffect(() => this.actions$.pipe(
  //   ofType(GoalPageActions.selectGoal),
  //   switchMap((action) => {
  //     return this.goalService.getGoalById(action.goalId).pipe(
  //       map((response) => GoalApiActions.getGoalByIdSuccess({response})),
  //       catchError((error) => of(GoalApiActions.getGoalByIdFailure({error})))
  //     )
  //   })
  // ))

  setActiveGoalByIdFromUrl$ = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter((r: RouterNavigatedAction) => {
      return r.payload.routerState.url.startsWith('/goals/');
    }),
    switchMap((route) => {
      const goalId = parseInt(route.payload.routerState.url.replace('/goals/',''));
        return from(this.goalService.getGoalById(goalId)).pipe(
          map((response) => GoalApiActions.getGoalByIdSuccess({response})),
          catchError((error) => of(GoalApiActions.getGoalByIdFailure({error})))
        )
      }
    )
  ));

  addTaskToGoal$ = createEffect(() => this.actions$.pipe(
    ofType(GoalPageActions.addTask),
    switchMap((action) => {
      return from(this.taskService.addTask(action.task)).pipe(
        map((response) => {
          setTimeout(()=>{ this.dialog.closeAll(); },300);
          this.notificationService.showSuccessNotification(response.message);
          return GoalApiActions.addTaskToGoalSuccess({response});
        }),
        catchError((error) => {
          this.notificationService.showErrorNotification(error.message);
          return of(GoalApiActions.addTaskToGoalFailure(error))
        })
      )
    })
  ),{ dispatch: false });

  updateGoalTask$ = createEffect(() => this.actions$.pipe(
    ofType(GoalPageActions.updateTask),
    switchMap((action) => {
      const previousTaskStatus = action.previousTaskStatus;
      const changedTask = action.changedTask;
      return from(this.taskService.updateTask(action.taskId,changedTask)).pipe(
        map((response) => {
          this.notificationService.showSuccessNotification(response.message);
          setTimeout(()=>{ this.dialog.closeAll(); },300);
          return GoalApiActions.updateGoalTaskSuccess({previousTaskStatus,response});
        }),
        catchError((error) => {
          this.notificationService.showErrorNotification(error.message);
          return of(GoalApiActions.updateGoalTaskFailure(error))
        })
      )
    })
  ),{ dispatch: false });
}
