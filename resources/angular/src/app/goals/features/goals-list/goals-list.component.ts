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
import {MatDialog} from "@angular/material/dialog";
import {AddTaskModalComponent} from "../../../shared/components/add-task-modal/add-task-modal.component";

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
              private dialog: MatDialog,
              private store$: Store) {
    this.title.setTitle('My Goals');
    this.goals$ = this.store$.select(goalsSelectors.goals);
  }

  ngOnInit() {
    this.getGoals();
  }

  getGoals(){
    this.store$.dispatch(GoalPageActions.get());
  }

  openGoalId(goalId: string) {
    const id = parseInt(goalId);
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

  openAddGoalModal() {
    this.dialog.open(AddTaskModalComponent,{
      panelClass: 'modal',
      minWidth: 340,
      width: '75%',
      data: {parentInfo: {noParent: true}}
    })
  }
}
