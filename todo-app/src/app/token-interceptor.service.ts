import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { TaskService } from './task.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector : Injector) { }

  intercept(req: { clone: (arg0: { setHeaders: { Authorization: string; }; }) => any; }, next: { handle: (arg0: any) => any; }){
    let taskservice = this.injector.get(TaskService);
    console.log('intercepted');
    
    let toqenizedReq = req.clone({
      setHeaders : {
        Authorization : `Bearer ${taskservice.getToken()}`,
      }
    });
    return next.handle(toqenizedReq);
  };
}
