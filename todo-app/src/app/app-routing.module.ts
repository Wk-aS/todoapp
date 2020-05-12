import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TestComponent } from './test/test.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { path: '', component : FormComponent},
  { path: 'todos', component : TestComponent, 
  canActivate : [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
