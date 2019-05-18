import { Component, OnInit } from '@angular/core';
import { ToDo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  flagInputTask: boolean = false;
  flagInputSubTask: boolean = false;
  subTaskData: string = "";
  todosList: any = [];
  taskNames: any = [];
  subTasks: any = [];
  presentTodo = 0;
  newTodo: ToDo = new ToDo();
  title: string = "";
  taskId = 0;

  constructor(private todoService: TodoService) {
  }
  ngOnInit() {

    this.todoService.getTodo()
      .subscribe((res) => {
        this.todosList = res;
        this.subTasks = this.todosList[this.presentTodo].subTasks;
      })
  }


  showTaskForm() {
    this.flagInputTask = true;
  }
  showSubTaskForm() {
    this.flagInputSubTask = true;
  }


  closeInput() {
    this.flagInputTask = false;
    this.flagInputSubTask = false;
  }
  displaySubTasks(index) {
    this.presentTodo = index;
    this.subTasks = this.todosList[this.presentTodo].subTasks
  }

  public addTask() {
    this.flagInputTask = false;
    this.newTodo.title = this.title;
    this.taskId = this.todosList.length+1;
    this.newTodo.taskId = this.taskId;
    this.title = "";
    this.todoService.createTodo(this.newTodo)
      .subscribe((res) => {
        this.todosList.push(this.newTodo);
        this.newTodo = new ToDo();
      })
  }

  public addSubTask() {
    debugger;
    this.flagInputSubTask = false;
    let currentTodo = this.todosList[this.presentTodo];
    currentTodo.subTasks.push(this.subTaskData);
    this.todoService.updateTodo(currentTodo)
      .subscribe((res) => {
        console.log(res)
        var foundIndex = this.todosList.findIndex(x => x.title == res.title);
        this.todosList[foundIndex] = res;
      })
  }

  public deleteTask(index) {
    let currentTodo = this.todosList[index];
    console.log(currentTodo)
    this.todoService.deleteTodo(currentTodo)
    .subscribe((res) => {
      this.todosList.splice(this.todosList.indexOf(currentTodo), 1)
    })
  }

  public deleteSubTask(index) {
    const currentTodo = this.todosList[this.presentTodo];
    this.todoService.deleteSubTodo(index, currentTodo.taskId)
    .subscribe((res) => {
      console.log("enter")
      this.todosList[this.presentTodo].subTasks
      .splice(this.subTasks.indexOf(currentTodo.subTasks[index]), 1)
    })
  }

}
