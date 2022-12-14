import {createAction, props} from "@ngrx/store";
import {User, UserRegistration} from "../../core/models";

const getProfile = createAction('[USER PAGE] Get Profile');
const loadProfile = createAction('[USER PAGE] Load Profile', props<{ isLogged: boolean }>());
const register = createAction('[USER PAGE] Register', props<{ regForm: any }>());
const editProfile = createAction('[USER PAGE] Edit Profile', props<{ user: User }>());
const login = createAction('[USER PAGE] Login', props<{ email: string, password: string }>());
const logout = createAction('[USER PAGE] Logout');
const deleteAccount = createAction('[USER PAGE] Delete Account');
const loginCheck = createAction('[USER PAGE] Login Check');
const loginCheckSuccess = createAction('[USER PAGE] Login Check Success');
const loginCheckFailure = createAction('[USER PAGE] Login Check Failure',props<{error: string}>());


export const UserPageActions = {
  getProfile,
  loadProfile,
  register,
  editProfile,
  login,
  logout,
  loginCheck,
  loginCheckSuccess,
  loginCheckFailure,
  deleteAccount
}

