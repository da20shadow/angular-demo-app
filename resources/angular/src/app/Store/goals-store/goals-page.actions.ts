import {createAction, props} from "@ngrx/store";
import {Goal,Task} from "../../core/models";

const get = createAction('[GOAL PAGE] Get Goals');
const loadGoals = createAction('[GOAL PAGE] Load Goals');
const getGoalById = createAction('[GOAL PAGE] Get Goal By Id');
const selectGoal = createAction('[GOAL PAGE] Select a Goal',props<{goalId: number}>());
const clearSelectedGoal = createAction('[GOAL PAGE] Clear Selected Goal');
const createGoal = createAction('[GOAL PAGE] Create Goal',props<{goal: Goal}>());
const updateGoal = createAction('[GOAL PAGE] Update Goal',props<{goalId: number, changed: Goal}>());
const deleteGoal = createAction('[GOAL PAGE] Delete Goal',props<{goalId: number}>());

const addTask = createAction( '[TASK PAGE] Create Subtask', props<{task: Task}>());
const updateTask = createAction('[GOAL PAGE] Update Task',props<{taskId: number,previousTaskStatus:any, changedTask: Task}>());

export const GoalPageActions = {
  get,
  getGoalById,
  loadGoals,
  selectGoal,
  clearSelectedGoal,
  createGoal,
  updateGoal,
  deleteGoal,
  addTask,
  updateTask,
}
