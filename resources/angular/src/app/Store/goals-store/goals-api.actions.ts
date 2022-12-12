import {createAction, props} from "@ngrx/store";
import {AddGoalApiResult, DeleteGoalApiResult, Goal, UpdateGoalApiResult} from "../../core/models";

const loadSuccess = createAction('[GOALS API] Load Goals Success', props<{ goals: Goal[] }>());
const loadFailure = createAction('[GOALS API] Load Goals Failure', props<{ error: string }>());
const createSuccess = createAction('[GOALS API] Create Goal Success', props<{ response: AddGoalApiResult }>());
const createFailure = createAction('[GOALS API] Create Goal Failure', props<{ error: string }>());
const updateSuccess = createAction('[GOALS API] Update Goal Success', props<{ response: UpdateGoalApiResult }>());
const updateFailure = createAction('[GOALS API] Update Goal Failure', props<{ error: string }>());
const deleteSuccess = createAction('[GOALS API] Delete Goal Success', props<{ response: DeleteGoalApiResult }>());
const deleteFailure = createAction('[GOALS API] Delete Goal Failure', props<{ error: string }>());

export const GoalApiActions = {
  loadSuccess,
  loadFailure,
  createSuccess,
  createFailure,
  updateSuccess,
  updateFailure,
  deleteSuccess,
  deleteFailure,
}
