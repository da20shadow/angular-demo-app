export interface Task {
  id: number|undefined,
  title: string,
  description: string|undefined,
  status: "TO DO",
  priority: "High",
  goal_id: number|undefined,
  task_id: number|undefined,
  user_id: number|undefined,
  start_date: string|undefined,
  end_date: string|undefined,
  created_at: string|undefined,
  updated_at: string|undefined,
}
