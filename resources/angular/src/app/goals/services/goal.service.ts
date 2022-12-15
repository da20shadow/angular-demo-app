import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Goal, GoalApiResponse} from "../../core/models";
import {ApiUrls} from "../../shared/constants/api-urls";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private http: HttpClient) { }

  getAllGoals() {
    console.log('GoalService')
    return this.http.get<Goal[]>(ApiUrls.GOALS).pipe(
      tap((res) => {
        console.log('Goals Service res: ', res)
      })
    );
  }

  saveGoal(goal: Goal) {
    return this.http.post<GoalApiResponse>(ApiUrls.GOAL_ADD,goal);
  }

  updateGoal(goalId: number, changed: Goal) {
    return this.http.patch<GoalApiResponse>(ApiUrls.GOAL_UPDATE+`/${goalId}`,changed);
  }

  deleteGoal(goalId: number) {
    return this.http.delete<GoalApiResponse>(ApiUrls.GOAL_DELETE+ `/${goalId}`);
  }

  getGoalById(goalId: number) {
    return this.http.get<GoalApiResponse>(ApiUrls.GOALS + `/${goalId}`);
  }
}
