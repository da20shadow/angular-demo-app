import {Task} from "./Task";

export interface TaskApiResponse {
  message: string;
  task: Task;
  task_id: number|null|undefined;
}
