import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task, TaskApiResponse} from "../../core/models";
import {ApiUrls} from "../../shared/constants/api-urls";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  updateTask(taskId: number,task: Task) {
    return this.http.patch<TaskApiResponse>(ApiUrls.TASK_UPDATE + `/${taskId}`,task);
  }

  addTask(task: Task) {
    return this.http.post<TaskApiResponse>(ApiUrls.TASK_ADD,task);
  }

  deleteTask(taskId: number|undefined|null) {
    if (!taskId){throw of({error: {message: 'Invalid task id!'}});}
    return this.http.delete<TaskApiResponse>(ApiUrls.TASK_DELETE + `/${taskId}`);
  }

  getTaskById(taskId: number) {
    return this.http.get<TaskApiResponse>(ApiUrls.TASKS + `/${taskId}`);
  }
}
