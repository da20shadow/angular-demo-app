import {Goal} from "./Goal";

export interface GoalApiResponse {
  message: string;
  goal: Goal|null|undefined;
  goalId: number|null|undefined;
}
