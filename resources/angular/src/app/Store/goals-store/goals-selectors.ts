import {GoalsState} from "./goals.reducer";
import {createSelector} from "@ngrx/store";

export const selectState = (state: GoalsState) => state;
export const selectAll = (state: GoalsState) => state.goals;
export const selectStatus = (state: GoalsState) => state.status;
export const selectActiveGoalId = (state: GoalsState) => state.selectedGoalId;
export const selectActiveGoal = createSelector(
  selectAll,
  selectActiveGoalId,
  (goals,activeGoalId) => goals.find(g => g.id === activeGoalId) || undefined
);

