import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-todoform',
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.css']
})
export class TodoformComponent implements OnInit {

  @Output() onNewTodo = new EventEmitter<string>(); 
  constructor(private taskService : TaskService) { }

  newTodo : string = '';

  ngOnInit(): void {
  }

  onSubmit() {
      //console.log(this.newTodo);
      this.onNewTodo.emit(this.newTodo);
      
      this.taskService.createTodo({
        title : this.newTodo,
        isDone : false
      }).subscribe((response : any )=>{
        console.log(response);  
      });
      this.newTodo = '';

  }


  
  

}
