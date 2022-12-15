import {createAction, props} from "@ngrx/store";
import { Goal, GoalApiResponse,TaskApiResponse} from "../../core/models";

const loadSuccess = createAction('[GOALS API] Load Goals Success', props<{ goals: Goal[] }>());
const loadFailure = createAction('[GOALS API] Load Goals Failure', props<{ error: GoalApiResponse }>());

const createSuccess = createAction('[GOALS API] Create Goal Success', props<{ response: GoalApiResponse }>());
const createFailure = createAction('[GOALS API] Create Goal Failure', props<{ error: GoalApiResponse }>());

const updateSuccess = createAction('[GOALS API] Update Goal Success', props<{ response: GoalApiResponse }>());
const updateFailure = createAction('[GOALS API] Update Goal Failure', props<{ error: GoalApiResponse }>());

const deleteSuccess = createAction('[GOALS API] Delete Goal Success', props<{ response: GoalApiResponse }>());
const deleteFailure = createAction('[GOALS API] Delete Goal Failure', props<{ error: GoalApiResponse }>());

const getGoalByIdSuccess = createAction('[GOALS API] Get Goal Success', props<{ response: GoalApiResponse }>());
const getGoalByIdFailure = createAction('[GOALS API] Get Goal Failure', props<{ error: GoalApiResponse }>());

const updateTaskSuccess = createAction('[GOAL API] Update Task Success',props<{response: TaskApiResponse}>());
const updateTaskFailure = createAction('[GOAL API] Update Task Failure',props<{error: TaskApiResponse}>());

export const GoalApiActions = {
  loadSuccess,
  loadFailure,
  getGoalByIdSuccess,
  getGoalByIdFailure,
  createSuccess,
  createFailure,
  updateSuccess,
  updateFailure,
  deleteSuccess,
  deleteFailure,
  updateTaskSuccess,
  updateTaskFailure
}
