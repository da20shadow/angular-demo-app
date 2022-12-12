import {createAction, props} from "@ngrx/store";
import {Goal} from "../../core/models";

const loadGoals = createAction('[GOAL PAGE] Load Goals');
const selectGoal = createAction('[GOAL PAGE] Select a Goal',props<{goalId: number}>());
const clearSelectedGoal = createAction('[GOAL PAGE] Clear Selected Goal');
const createGoal = createAction('[GOAL PAGE] Create Goal',props<{goal: Goal}>());
const updateGoal = createAction('[GOAL PAGE] Update Goal',props<{goalId: number, changed: Goal}>());
const deleteGoal = createAction('[GOAL PAGE] Delete Goal',props<{goalId: number}>());

export const GoalPageActions = {
  loadGoals,
  selectGoal,
  clearSelectedGoal,
  createGoal,
  updateGoal,
  deleteGoal,
}
