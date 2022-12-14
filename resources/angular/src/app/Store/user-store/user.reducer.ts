import {UserState} from "../../core/models";
import {createReducer, on} from "@ngrx/store";
import {UserPageActions} from "./user-page.actions";
import {UserApiActions} from "./user-api.actions";

const initialState: UserState = {
  user: undefined,
  isLoggedIn: false,
  error: null,
  status: "pending"
}

export const userReducer = createReducer(
  initialState,
  on(UserPageActions.loginCheck, (state) => {
    return ({
      ...state,
      status: 'loading'
    })
  }),
  on(UserPageActions.loginCheckSuccess, (state) => {
    return ({
      ...state,
      isLoggedIn: true,
      status: 'success'
    })
  }),
  on(UserPageActions.loginCheckFailure, (state,{error}) => {
    return ({
      ...state,
      user: undefined,
      isLoggedIn: false,
      error: error,
      status: 'error'
    })
  }),
  on(UserPageActions.login, (state) => {
    return ({
      ...state,
      status: 'loading'
    })
  }),
  on(UserApiActions.loginSuccess, (state, {response}) => {
    if (!response.user) {return state;}
    return ({
      ...state,
      user: response.user,
      error: null,
      isLoggedIn: true,
      status: 'success'
    })
  }),
  on(UserApiActions.loginFailure, (state, {error}) => {
    return ({
      ...state,
      isLoggedIn: false,
      error: error.message,
      status: 'error'
    })
  }),
  on(UserPageActions.register, (state) => {
    return ({
      ...state,
      status: 'loading'
    })
  }),
  on(UserApiActions.registerSuccess, (state, {response}) => {
    if (!response.user) {
      return state;
    }
    return ({
      ...state,
      user: response.user,
      isLoggedIn: true,
      error: null,
      status: 'success'
    })
  }),
  on(UserApiActions.registerFailure, (state, {error}) => {
    return ({
      ...state,
      isLoggedIn: false,
      error: error.message,
      status: 'error'
    })
  }),
  on(UserPageActions.getProfile, (state) => state),
  on(UserPageActions.loadProfile, (state) => {
    return ({
      ...state,
      status: 'loading'
    })
  }),
  on(UserApiActions.loadProfileSuccess, (state, {response}) => {
    if (!response.user) {
      return state;
    }
    return ({
      ...state,
      user: response.user,
      status: 'success'
    })
  }),
  on(UserApiActions.loadProfileFailure, (state, {error}) => {
    return ({
      ...state,
      isLoggedIn: false,
      error: error.message,
      status: 'error'
    })
  }),
  on(UserPageActions.editProfile, (state) => {
    return ({
      ...state,
      status: 'loading'
    })
  }),
  on(UserApiActions.editProfileSuccess, (state, {response}) => {
    if (!response.user) {
      return state;
    }
    return ({
      ...state,
      user: response.user,
      status: 'success'
    })
  }),
  on(UserApiActions.editProfileFailure, (state, {error}) => {
    return ({
      ...state,
      error: error.message,
      status: 'error'
    })
  }),
  on(UserPageActions.deleteAccount, (state) => {
    return ({
      ...state,
      status: 'loading'
    })
  }),
  on(UserApiActions.deleteSuccess, () => initialState),
  on(UserApiActions.deleteFailure, (state, {error}) => {
    return ({
      ...state,
      error: error.message,
      status: 'error'
    })
  }),
  on(UserPageActions.logout, (state) => {
    return ({
      ...state,
      status: 'loading'
    })
  }),
  on(UserApiActions.logoutSuccess, () => initialState),
  on(UserApiActions.logoutFailure, (state,{error}) => {
    return ({
      ...state,
      error: error.message,
      status: 'error'
    })
  }),
);

