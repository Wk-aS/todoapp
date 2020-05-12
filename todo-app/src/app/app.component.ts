import { Component, OnInit } from '@angular/core';
import  toDoItems  from './toDoItems';
import UserData from '../../../server/index';
import { TaskService } from './task.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  
  todos : toDoItems[] = [];
  constructor(private taskService : TaskService){}

  delay(ms: number) {
    console.log(" we are waiting");
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  ngOnInit(): void {
  }

  onNewTodo(newtodo : string){
    this.todos.push({
      title : newtodo,
      isDone : false
    });
    
  }
  remove(todo : string){
    (async () => { 
      // Do something before delay
      //console.log('before delay')

      //await this.delay(500);

      // Do something after
      //console.log('after delay')

      //removing the item from the to do list
      //let filtered : toDoItems[] = this.todos.filter(function(value){ return value.title != todo });
      this.todos.forEach(element => {
        if(element.title == todo){
          this.taskService.updateTodo(element).subscribe((response : any )=>{
            //console.log(response);  
          });
          element.isDone = !element.isDone;
        }
      });
  })();
  //console.log(this.todos);
  }
  
}
