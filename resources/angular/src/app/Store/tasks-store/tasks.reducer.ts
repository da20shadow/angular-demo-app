import {Status, Task} from "../../core/models";
import {createReducer, on} from "@ngrx/store";
import {TaskPageActions} from "./tasks-page.actions";
import {TaskApiActions} from "./tasks-api.actions";

export interface TasksState {
  activeTask: Task|undefined;
  error: string|null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

const initialState: TasksState = {
  activeTask: undefined,
  error: null,
  status: 'pending'
}

export const tasksReducer = createReducer(
  initialState,
  on(TaskPageActions.loadTaskById, (state) => {
    return ({
      ...state,
      status: 'loading'
    })
  }),
  on(TaskApiActions.loadTaskByIdSuccess, (state,{response}) => {
    if (!response.task){return state}
    return ({
      ...state,
      activeTask: response.task,
      status: 'success'
    })
  }),
  on(TaskApiActions.loadTaskByIdFailure, (state, {error}) => {
    return ({
      ...state,
      error: error.message,
      status: 'error'
    })
  }),
  on(TaskApiActions.createSubtaskSuccess, (state,{response}) => {
    if (!response.task || !state.activeTask){return state}
    return ({
      ...state,
      activeTask: {
        ...state.activeTask,
        todo_tasks: [
          response.task,
          ...state.activeTask.todo_tasks
        ]
      }
    })
  }),
  on(TaskApiActions.createSubtaskFailure, (state,{error}) => {
    return ({
      ...state,
      error: error.message,
      status: 'error'
    })
  }),
  on(TaskApiActions.updateSubtaskSuccess, (state,{previousTaskStatus,response}) => {
    const updatedTask:Task|null|undefined = response.task;
    if (!updatedTask || !state.activeTask){return state}

    //TODO: to make file with helper functions and add this one!!!
    //TODO: Think how to optimize this !
    let statusListName;
    let updatedTaskList:any= [];
    switch (updatedTask.status) {
      case Status.TO_DO:
        updatedTaskList = state.activeTask.todo_tasks.map(t => t);
        statusListName = 'todo_tasks';
        break;
      case Status.IN_PROGRESS:
        statusListName = 'in_progress_tasks';
        updatedTaskList = state.activeTask.in_progress_tasks.map(t => t);
        break;
      case Status.IN_REVISION:
        statusListName = 'in_revision_tasks';
        updatedTaskList = state.activeTask.in_revision_tasks.map(t => t);
        break;
    }

    let removedTaskStatusListName;
    let taskListWithRemovedPreviousTask;
    switch (previousTaskStatus) {
      case Status.TO_DO:
        if (updatedTask.status == Status.TO_DO){
          updatedTaskList = state.activeTask.todo_tasks
            .map(t => t.id === updatedTask.id ? updatedTask : t);
        }else {
          removedTaskStatusListName = 'todo_tasks'
          taskListWithRemovedPreviousTask = state.activeTask.todo_tasks.filter(t => t.id !== updatedTask.id);
          updatedTaskList.push(updatedTask);
        }
        break;
      case Status.IN_PROGRESS:
        if (updatedTask.status === previousTaskStatus){
          updatedTaskList = state.activeTask.in_progress_tasks
            .map(t => t.id === updatedTask.id ? updatedTask : t);
        }else{
          removedTaskStatusListName = 'in_progress_tasks';
          taskListWithRemovedPreviousTask = state.activeTask.in_progress_tasks.filter(t => t.id !== updatedTask.id);
          updatedTaskList.push(updatedTask);
        }
        break;
      case Status.IN_REVISION:
        if (updatedTask.status == Status.IN_REVISION){
          updatedTaskList = state.activeTask.in_revision_tasks
            .map(t => t.id === updatedTask.id ? updatedTask : t);
        }else {
          removedTaskStatusListName = 'in_revision_tasks';
          taskListWithRemovedPreviousTask = state.activeTask.in_revision_tasks.filter(t => t.id !== updatedTask.id);
          updatedTaskList.push(updatedTask);
        }
        break;
    }
    if (!statusListName){ return state; }
    if (removedTaskStatusListName){
      return ({
        ...state,
        activeTask: {
          ...state.activeTask,
          [removedTaskStatusListName]: taskListWithRemovedPreviousTask,
          [statusListName]: updatedTaskList,

        }
      })
    }else {
      return ({
        ...state,
        activeTask: {
          ...state.activeTask,
          [statusListName]: updatedTaskList,
        }
      })
    }
  }),
  on(TaskApiActions.updateSubtaskFailure, (state,{error}) => {
    return ({
      ...state,
      error: error.message,
      status: 'error'
    })
  }),
  on(TaskApiActions.deleteSubtaskSuccess, (state,{taskStatus,response}) => {
    const deletedTaskId = response.task_id;
    if (!deletedTaskId || !state.activeTask || !taskStatus){
      //TODO: remove the alert!
      alert('Invalid task status! - called from deleteTaskSuccess task reducer method!')
      return state;
    }

    let taskList = '';
    let updatedTaskList;
    switch (taskStatus){
      case Status.TO_DO:
        taskList = 'todo_tasks';
        updatedTaskList = state.activeTask.todo_tasks
          .filter(t => t.id !== deletedTaskId);
        break;
      case Status.IN_PROGRESS:
        taskList = 'in_progress_tasks';
        updatedTaskList = state.activeTask.in_progress_tasks
          .filter(t => t.id !== deletedTaskId);
        break;
      case Status.IN_REVISION:
        taskList = 'in_revision_tasks';
        updatedTaskList = state.activeTask.in_revision_tasks
          .filter(t => t.id !== deletedTaskId);
        break;
    }

    return ({
      ...state,
      activeTask: {
        ...state.activeTask,
        [taskList]: updatedTaskList
      }
    })
  }),
)
