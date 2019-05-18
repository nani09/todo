import {ToDo} from '../models/todo.model';
import { Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Output, EventEmitter} from '@angular/core'

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  api_url = 'http://localhost:3000/api';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
    
  };
  constructor( private http: HttpClient ) {

   }

   createTodo(todo: ToDo): Observable<any> {
    return this.http.post(this.api_url, todo, this.httpOptions);
  }

  getTodo(): Observable<any> {
    return this.http.get(this.api_url);
  }

  updateTodo(todo: ToDo): Observable<any> {
    return this.http.put(this.api_url, todo, this.httpOptions);
  }

  deleteTodo(todo: ToDo): Observable<any> {
    console.log(todo)
    return this.http.delete(this.api_url+'/'+todo.taskId)
  }

  deleteSubTodo(subTask,taskId): Observable<any> {
    return this.http.delete(this.api_url+'/subtask'+'/'+subTask+'/'+taskId);
  }

}