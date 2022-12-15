import {Component, OnInit} from '@angular/core';
import {GlobalClasses} from "../../../shared/constants/Global-Classes";
import {Store} from "@ngrx/store";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Goal} from "../../../core/models";
import {goalsSelectors} from "../../../Store/app.state";
import {GoalPageActions} from "../../../Store/goals-store/goals-page.actions";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.scss']
})
export class GoalsListComponent implements OnInit{

  classes = GlobalClasses;
  goals$: Observable<Goal[]>;

  constructor(private title: Title,
              private router: Router,
              private store$: Store) {
    this.title.setTitle('My Goals');
    this.goals$ = this.store$.select(goalsSelectors.goals);
  }

  ngOnInit() {
    this.getGoals();
    //TODO: Delete this log
    console.log('goals-list.component.ts ngOnInit goals$', this.goals$)
  }

  getGoals(){
    this.store$.dispatch(GoalPageActions.get());
  }

  openGoalId(goalId: string) {
    const id = parseInt(goalId);
    //TODO: remove log
    console.log('Open Goal id', id)
    this.store$.dispatch(GoalPageActions.selectGoal({goalId:id}));
    this.router.navigate([`goals/${id}`])
  }

  createNewGoal(goalFormData: NgForm){
    if (goalFormData.invalid){
      return;
    }
    this.store$.dispatch(GoalPageActions.createGoal({goal: goalFormData.value}))
  }

  deleteGoal(goalId: number){
    this.store$.dispatch(GoalPageActions.deleteGoal({goalId}));
  }

}
