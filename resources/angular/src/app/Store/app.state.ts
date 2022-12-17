import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  StoreModule
} from "@ngrx/store";
import {NgModule} from "@angular/core";
import {goalsReducer, GoalsState} from "./goals-store/goals.reducer";
import {UserState} from "../core/models";
import {userReducer} from "./user-store/user.reducer";
import {tasksReducer, TasksState} from "./tasks-store/tasks.reducer";


/** Feature Keys */
const APP_FEATURE_KEY = 'appState'

/** State Shape */
interface AppState {
  goalsState: GoalsState;
  userState: UserState;
  tasksState: TasksState;
}

const reducers : ActionReducerMap<AppState> = {
  userState: userReducer,
  goalsState: goalsReducer,
  tasksState: tasksReducer,
}

const metaReducers: MetaReducer<AppState>[] = [];

//TODO: move the selectors in separate file and connect it here!
/** -------------------------------Selectors START -------------------------------*/
const selectAppState = createFeatureSelector<AppState>(APP_FEATURE_KEY);

/** Goals Selectors */
const goalsStateApp = createSelector(
  selectAppState,
  (state: AppState) => state.goalsState
)
const goals = createSelector(
  goalsStateApp,
  (state) => state.goals
)
//TODO: Remove if not needed anymore

// const activeGoal = createSelector(
//   goalsStateApp,
//   goalsSelectorsList.selectActiveGoal
// )
const activeGoal = createSelector(
  goalsStateApp,
  (state) => state.activeGoal
)
const goalsStateStatus = createSelector(
  goalsStateApp,
  (state) => state.status
)

export const goalsSelectors = {
  goalsStateApp,
  goals,
  activeGoal,
  goalsStateStatus,
}
/** User Selectors */
const userState = createSelector(
  selectAppState,
  (state) => state.userState
)
const user = createSelector(userState,state => state.user)
const userStateStatus = createSelector(userState,state => state.status)
const isLoggedIn = createSelector(userState,state => state.isLoggedIn)

export const userSelectors = {
  user,
  isLoggedIn,
  userState,
  userStateStatus,
}

/** Tasks Selectors */
const tasksState = createSelector(
  selectAppState,
  (state) => state.tasksState
);
const activeTask = createSelector(tasksState, state => state.activeTask);
const tasksStateStatus = createSelector(tasksState, state => state.status);
export const tasksSelectors = {
  tasksState,
  activeTask,
  tasksStateStatus
}

/** Module */
@NgModule({
  imports: [StoreModule.forFeature(APP_FEATURE_KEY,reducers,{metaReducers})]
})
export class SharedAppStateModule{}

/** -------------------------------Selectors END -------------------------------*/


