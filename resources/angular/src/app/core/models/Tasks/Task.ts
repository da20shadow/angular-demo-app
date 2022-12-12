import {Status} from "../../../shared/constants/Status";
import {Priority} from "../../../shared/constants/Priority";

export interface Task {
  id: number|undefined,
  title: string,
  description: string|undefined,
  status: Status|undefined,
  priority: Priority|undefined,
  goal_id: number|undefined,
  task_id: number|undefined,
  user_id: number|undefined,
  start_date: string|undefined,
  end_date: string|undefined,
  created_at: string|undefined,
  updated_at: string|undefined,
}
