import {Component, Inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {GlobalClasses} from "../../../shared/constants/Global-Classes";
import {Goal} from "../../../core/models";
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {goalsSelectors} from "../../../Store/app.state";
import {GoalPageActions} from "../../../Store/goals-store/goals-page.actions";
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddTaskModalComponent} from "../../../shared/components/add-task-modal/add-task-modal.component";

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.scss']
})
export class GoalDetailsComponent {

  classes = GlobalClasses;
  goal$: Observable<Goal|undefined>;
  editGoal:boolean = false;

  constructor(private title: Title,
              private dialog: MatDialog,
              private store$: Store) {
    //TODO: add the goal title as title of the page!
    this.title.setTitle('Goal - GoalsApp')
    this.goal$ = this.store$.select(goalsSelectors.activeGoal);
    this.store$.dispatch(GoalPageActions.getGoalById())
  }

  editGoalFormHandler(editGoalForm: NgForm) {
    if (editGoalForm.invalid){alert('Invalid Form Fields!'); return;}
    const changed = editGoalForm.value;
    this.store$.dispatch(GoalPageActions.updateGoal({goalId: changed.id, changed }))
    this.editGoal = false;
  }

  openAddTaskModal(goalId: number|undefined|null) {
    if (!goalId){return;}

    //TODO remove the log
    console.log('Button is pressed from TASKS DETAILS!!')

    this.dialog.open(AddTaskModalComponent,{
      panelClass: 'modal',
      minWidth: 340,
      width: '75%',
      data: {parentInfo: {goalId}}
    });
  }
}
