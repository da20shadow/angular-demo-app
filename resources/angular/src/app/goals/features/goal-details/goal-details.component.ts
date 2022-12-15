import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {GlobalClasses} from "../../../shared/constants/Global-Classes";
import {Goal} from "../../../core/models";
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {goalsSelectors} from "../../../Store/app.state";
import {GoalPageActions} from "../../../Store/goals-store/goals-page.actions";
import {NgForm} from "@angular/forms";

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
              private route: ActivatedRoute,
              private store$: Store) {
    //TODO: add the goal title as title of the page!
    this.title.setTitle('Goal - GoalsApp')
    this.goal$ = this.store$.select(goalsSelectors.activeGoal);
    this.store$.dispatch(GoalPageActions.getGoalById())
  }

  updateTask(taskInfo: any){
    this.store$.dispatch(GoalPageActions.updateTask({taskId:taskInfo.taskId,task:taskInfo.task}));
  }

  doSomething() {
    alert('Title Clicked!')
    //TODO Remove this!
    console.log('goal', this.goal$)
  }

  editGoalFormHandler(editGoalForm: NgForm) {
    if (editGoalForm.invalid){alert('Invalid Form Fields!'); return;}
    console.log(editGoalForm.value)
    const changed = editGoalForm.value;
    this.store$.dispatch(GoalPageActions.updateGoal({goalId: changed.id, changed }))
    this.editGoal = false;
  }

}
