import {UserState} from "../../core/models";
import {createFeature, createFeatureSelector, createSelector} from "@ngrx/store";

// const USER_FEATURE_KEY = 'user';

// const userFeatureSelector = createFeatureSelector<UserState>(USER_FEATURE_KEY)
//
export const selectUserState = (state: UserState) => state;
export const selectUser = (state: UserState) => state.user;
export const selectStatus = (state: UserState) => state.status;
export const selectIsLoggedIn = (state: UserState) => state.isLoggedIn;

