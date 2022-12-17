import {createAction, props} from "@ngrx/store";
import {Status, Task, TaskApiResponse} from "../../core/models";

const loadTaskByIdSuccess = createAction( '[TASK API] Get Task By Id Success', props<{response: TaskApiResponse}>());
const loadTaskByIdFailure = createAction( '[TASK API] Get Task By Id Failure', props<{error: TaskApiResponse}>());

const createSubtaskSuccess = createAction( '[TASK API] Create Subtask Success', props<{response: TaskApiResponse}>());
const createSubtaskFailure = createAction( '[TASK API] Create Subtask Failure', props<{error: TaskApiResponse}>());

const updateSubtaskSuccess = createAction( '[TASK API] Update Subtask Success', props<{previousTaskStatus:string,response: TaskApiResponse}>());
const updateSubtaskFailure = createAction( '[TASK API] Update Subtask Failure', props<{error: TaskApiResponse}>());

const deleteSubtaskSuccess = createAction( '[TASK API] Delete Subtask Success', props<{taskStatus: string|undefined|null|Status,response: TaskApiResponse}>());
const deleteSubtaskFailure = createAction( '[TASK API] Delete Subtask Failure', props<{error: TaskApiResponse}>());

export const TaskApiActions = {
  loadTaskByIdSuccess,
  loadTaskByIdFailure,
  createSubtaskSuccess,
  createSubtaskFailure,
  updateSubtaskSuccess,
  updateSubtaskFailure,
  deleteSubtaskSuccess,
  deleteSubtaskFailure,
}
