import {createAction, props} from "@ngrx/store";
import {UserApiResponse} from "../../core/models";

const getProfileSuccess = createAction('[USER PAGE] getProfile Success', props<{ response: UserApiResponse }>());
const getProfileFailure = createAction('[USER PAGE] getProfile Failure', props<{ error: UserApiResponse }>());
const loadProfileSuccess = createAction('[USER PAGE] loadProfile Success', props<{ response: UserApiResponse }>());
const loadProfileFailure = createAction('[USER PAGE] loadProfile Failure', props<{ error: UserApiResponse }>());
const registerSuccess = createAction('[USER PAGE] register Success', props<{ response: UserApiResponse }>());
const registerFailure = createAction('[USER PAGE] register Failure', props<{ error: UserApiResponse }>());
const editProfileSuccess = createAction('[USER PAGE] editProfile Success', props<{ response: UserApiResponse }>());
const editProfileFailure = createAction('[USER PAGE] editProfile Failure', props<{ error: UserApiResponse }>());
const loginSuccess = createAction('[USER PAGE] login Success', props<{ response: UserApiResponse }>());
const loginFailure = createAction('[USER PAGE] login Failure', props<{ error: UserApiResponse }>());
const deleteSuccess = createAction('[USER PAGE] logout Success');
const deleteFailure = createAction('[USER PAGE] logout Failure', props<{ error: UserApiResponse }>());
const logoutSuccess = createAction('[USER PAGE] logout Success', props<{ response: UserApiResponse }>());
const logoutFailure = createAction('[USER PAGE] logout Failure', props<{ error: UserApiResponse }>());

export const UserApiActions = {
  getProfileSuccess,
  getProfileFailure,
  loadProfileSuccess,
  loadProfileFailure,
  registerSuccess,
  registerFailure,
  editProfileSuccess,
  editProfileFailure,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  deleteSuccess,
  deleteFailure
}
