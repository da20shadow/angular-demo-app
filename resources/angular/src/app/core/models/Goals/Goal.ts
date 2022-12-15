import {GoalCategories} from "./GoalCategories";
import {Task} from "../Tasks/Task";

export interface Goal {
  id: number|undefined|null;
  title: string;
  description: string|undefined|null;
  completed: boolean|undefined|null;
  start_date: string|undefined|null;
  due_date: string|undefined|null;
  user_id: string|undefined|null;
  created_at: string|undefined|null;
  updated_at: string|undefined|null;
  category: GoalCategories|undefined|null;
  tasks: Task[];
}
