import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import  toDoItems  from '../toDoItems';
import {TodoformComponent} from '../todoform/todoform.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() todos: toDoItems[];
  @Output() remove = new EventEmitter<string>(); 

  text : string = '';

  constructor() { }

  removeItem(item : string){
    this.remove.emit(item);
    //console.log(item);
  } 

  ngOnInit(): void {
  }

  setClass(){
    this.todos.forEach(element => {
      if(element.isDone == true){
        console.log(element.isDone);
        return { 'background-color': 'red', };
      }
    });
  }

}
