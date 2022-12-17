import {Status} from "./Status";
import {Priority} from "./Priority";

export interface Task {
  id: number|undefined|null,
  title: string|undefined|null,
  description: string|undefined|null,
  status: Status|string|undefined|null,
  priority: Priority|string|undefined|null,
  goal_id: number|undefined|null,
  task_id: number|undefined|null,
  user_id: number|undefined|null,
  start_date: string|undefined|null,
  end_date: string|undefined|null,
  created_at: string|undefined|null,
  updated_at: string|undefined|null,
  todo_tasks: Task[];
  in_progress_tasks: Task[];
  in_revision_tasks: Task[];
}
