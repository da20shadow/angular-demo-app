import {User} from "./User";

export interface UserState {
  user: User | undefined;
  isLoggedIn: boolean;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}
