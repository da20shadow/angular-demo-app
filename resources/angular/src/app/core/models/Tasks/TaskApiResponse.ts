import {Task} from "./Task";

export interface TaskApiResponse {
  message: string;
  task: Task|null|undefined;
  taskId: number|null|undefined;
}
