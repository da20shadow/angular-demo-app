import {Goal, Status, Task} from "../../core/models";
import {createReducer, on} from "@ngrx/store";
import {GoalPageActions} from "./goals-page.actions";
import {GoalApiActions} from "./goals-api.actions";

export interface GoalsState {
  goals: Goal[];
  selectedGoalId: number | null;
  activeGoal: Goal|undefined,
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

const initialState: GoalsState = {
  goals: [],
  selectedGoalId: null,
  activeGoal: undefined,
  error: null,
  status: 'pending'
}

export const goalsReducer = createReducer(
  initialState,
  on(GoalPageActions.get, (state) => state),
  on(GoalPageActions.getGoalById, (state) => {
    return ({
      ...state,
    })
  }),
  on(GoalApiActions.getGoalByIdSuccess, (state,{response}) => {
    const goal: Goal|undefined|null = response.goal;
    if (goal === null || goal === undefined){
      return state;
    }
    return ({
      ...state,
      activeGoal: goal,
    })
  }),
  on(GoalApiActions.getGoalByIdFailure, (state, {error}) => {
    return ({
      ...state,
      error: error.message,
    })
  }),
  on(GoalPageActions.loadGoals, (state) => {
    return ({
      ...state,
    });
  }),
  on(GoalPageActions.createGoal, (state,) => {
    return ({
      ...state,
    });
  }),
  on(GoalPageActions.updateGoal, (state) => {
    return ({
      ...state,
    });
  }),
  on(GoalPageActions.deleteGoal, (state) => {
    return ({
      ...state,
    });
  }),
  on(GoalPageActions.selectGoal, (state, {goalId}) => {
    if (state.activeGoal?.id === goalId){return state;}
    const goal = state.goals.find(g => g.id === goalId) || undefined;
    return ({
      ...state,
      activeGoal: goal,
      selectedGoalId: goalId
    });
  }),
  on(GoalApiActions.loadSuccess, (state, {goals}) => {
    //TODO: Remove this log
    console.log('Goals Reducer LoginSuccess', goals)
    return ({
      ...state,
      goals: goals,
      status: 'success'
    });
  }),
  on(GoalApiActions.loadFailure, (state, {error}) => {
    return ({
      ...state,
      error: error.message,
      status: 'error'
    });
  }),
  on(GoalApiActions.createSuccess, (state, {response}) => {
    if (!response.goal) {
      return state;
    }
    return ({
      ...state,
      goals: [response.goal, ...state.goals],
    });
  }),
  on(GoalApiActions.createFailure, (state, {error}) => {
    return ({
      ...state,
      error: error.message,
    });
  }),
  on(GoalApiActions.updateSuccess, (state, {response}) => {
    if (!response.goal || !state.activeGoal) {
      return state;
    }
    const goal: Goal = response.goal;
    return ({
      ...state,
      activeGoal: {
        ...state.activeGoal,
        title:goal.title,
        description:goal.description,
        category: goal.category,
        start_date: goal.start_date,
        end_date: goal.due_date
      },
      goals: state.goals.map(g => g.id === goal.id ? goal : g),
    });
  }),
  on(GoalApiActions.updateFailure, (state, {error}) => {
    return ({
      ...state,
      error: error.message,
    });
  }),
  on(GoalApiActions.deleteSuccess, (state, {response}) => {
    const goalId = response.goal_id;
    return ({
      ...state,
      goals: state.goals.filter(g => g.id !== goalId),
    });
  }),
  on(GoalApiActions.deleteFailure, (state, {error}) => {
    return ({
      ...state,
      error: error.message,
    });
  }),
  on(GoalApiActions.addTaskToGoalSuccess, (state, {response}) => {

    if (!response.task || !state.activeGoal){return state}

    //TODO: to make file with helper functions and add this one!!!
    const task: Task = response.task;

    return ({
      ...state,
      activeGoal: {
        ...state.activeGoal,
        todo_tasks: [task,...state.activeGoal.todo_tasks]
      }
    })
  }),
  on(GoalApiActions.addTaskToGoalFailure, (state, {error}) => {
    return ({
      ...state,
      error: error.message,
    });
  }),
  on(GoalApiActions.updateGoalTaskSuccess, (state, {previousTaskStatus,response}) => {

    if (!response.task || !state.activeGoal){return state}
    const updatedTask:Task = response.task;

    //TODO: to make file with helper functions and add this one!!!
    //TODO: Think how to optimize this !
    let statusListName;
    let updatedTaskList:any= [];
    switch (updatedTask.status) {
      case Status.TO_DO:
        updatedTaskList = state.activeGoal.todo_tasks.map(t => t);
        statusListName = 'todo_tasks';
      break;
      case Status.IN_PROGRESS:
        statusListName = 'in_progress_tasks';
        updatedTaskList = state.activeGoal.in_progress_tasks.map(t => t);
        break;
      case Status.IN_REVISION:
        statusListName = 'in_revision_tasks';
        updatedTaskList = state.activeGoal.in_revision_tasks.map(t => t);
        break;
    }

    let removedTaskStatusListName;
    let taskListWithRemovedPreviousTask;
    switch (previousTaskStatus) {
      case Status.TO_DO:
        if (updatedTask.status == Status.TO_DO){
          updatedTaskList = state.activeGoal.todo_tasks
            .map(t => t.id === updatedTask.id ? updatedTask : t);
        }else {
          removedTaskStatusListName = 'todo_tasks'
          taskListWithRemovedPreviousTask = state.activeGoal.todo_tasks.filter(t => t.id !== updatedTask.id);
          updatedTaskList.push(updatedTask);
        }
        break;
      case Status.IN_PROGRESS:
        if (updatedTask.status === previousTaskStatus){
          updatedTaskList = state.activeGoal.in_progress_tasks
            .map(t => t.id === updatedTask.id ? updatedTask : t);
        }else{
          removedTaskStatusListName = 'in_progress_tasks';
          taskListWithRemovedPreviousTask = state.activeGoal.in_progress_tasks.filter(t => t.id !== updatedTask.id);
          updatedTaskList.push(updatedTask);
        }
        break;
      case Status.IN_REVISION:
        if (updatedTask.status == Status.IN_REVISION){
          updatedTaskList = state.activeGoal.in_revision_tasks
            .map(t => t.id === updatedTask.id ? updatedTask : t);
        }else {
          removedTaskStatusListName = 'in_revision_tasks';
          taskListWithRemovedPreviousTask = state.activeGoal.in_revision_tasks.filter(t => t.id !== updatedTask.id);
          updatedTaskList.push(updatedTask);
        }
        break;
    }
    if (!statusListName){ return state; }

    if (removedTaskStatusListName){
      return ({
        ...state,
        activeGoal: {
          ...state.activeGoal,
          [removedTaskStatusListName]: taskListWithRemovedPreviousTask,
          [statusListName]: updatedTaskList,

        }
      })
    }else {
      return ({
        ...state,
        activeGoal: {
          ...state.activeGoal,
          [statusListName]: updatedTaskList,
        }
      })
    }
  }),
  on(GoalApiActions.updateGoalTaskFailure, (state, {error}) => {
    return ({
      ...state,
      error: error.message
    })
  }),
)
