import { Injectable } from '@angular/core';
import {Task, TaskApiResponse} from "../../core/models";
import {HttpClient} from "@angular/common/http";
import {ApiUrls} from "../../shared/constants/api-urls";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  updateTask(taskId: number,task: Task) {
    return this.http.patch<TaskApiResponse>(ApiUrls.TASK_UPDATE + `/${taskId}`,task);
  }
}
