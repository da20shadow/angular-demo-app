import {User} from "./User";

export interface UserApiResponse {
  message: string;
  user: User|null|undefined;
}
