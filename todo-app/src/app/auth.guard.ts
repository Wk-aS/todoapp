import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
    constructor(private taskService : TaskService,
                private route : Router){}

    canActivate() : boolean{
      if(this.taskService.loggedIn()){
        return true;
      }
      else{
        this.route.navigate(['/'])
        return false;
      }

    }

    
}
