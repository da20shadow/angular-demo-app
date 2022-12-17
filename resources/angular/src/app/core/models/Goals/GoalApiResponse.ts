import {Goal} from "./Goal";

export interface GoalApiResponse {
  message: string;
  goal: Goal|null|undefined;
  goal_id: number|null|undefined;
}
