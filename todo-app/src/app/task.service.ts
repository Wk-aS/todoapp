import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private webReqService : WebRequestService) { }

  createTodo(objet : object){
    return this.webReqService.post('addtodo',objet);
  }

  updateTodo(objet : object){
    return this.webReqService.post('update',objet);
  }

  getodos(){
    return this.webReqService.get('getTodos');
  }

  login(objet : object){
    return this.webReqService.post('login', objet);
  }

  loggedIn(){
    //double negate
    console.log('retriving');
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  
}
