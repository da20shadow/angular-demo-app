import {createAction, props} from "@ngrx/store";
import {Task} from "../../core/models";

const getTaskById = createAction( '[TASK PAGE] Get Task By Id', props<{taskId: number}>());
const loadTaskById = createAction( '[TASK PAGE] Load Task By Id');
const createSubtask = createAction( '[TASK PAGE] Create Subtask', props<{task: Task}>());
const updateSubtask = createAction( '[TASK PAGE] Update Subtask', props<{taskId: number,previousTaskStatus:any, changedTask: any}>());
const deleteSubtask = createAction( '[TASK PAGE] Delete Subtask', props<{task: Task}>());

export const TaskPageActions = {
  getTaskById,
  loadTaskById,
  createSubtask,
  updateSubtask,
  deleteSubtask,
}
