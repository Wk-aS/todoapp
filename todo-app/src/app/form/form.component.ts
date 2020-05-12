import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import {Router} from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private taskService : TaskService, private router : Router) { }
  email : string = '';
  password : string = '';

  test : any[] = [this.email, this.password];

  person  = {
    email : '',
    password : '',
  };

  ngOnInit(): void {

  }

  onSubmit(){
    this.person.email = this.email;
    this.person.password = this.password;
    this.taskService.login(this.person).subscribe((response : any )=>{
      console.log(response);  
      localStorage.setItem('token', response.token);
      this.router.navigate(['/todos']);
    });
    
  }
}
