import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import toDoItems from '../toDoItems';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  todos : toDoItems[] = [];
  constructor(private taskService : TaskService,
              private router : Router){}

  delay(ms: number) {
    console.log(" we are waiting");
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  ngOnInit(): void {
    this.taskService.getodos().subscribe((todo : toDoItems[], ) =>{
      todo.forEach(element => {
        this.todos.push(element);
      });
    },(err)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          this.router.navigate(['/']);
        }
      }
    });
    
    console.log(this.todos);
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
