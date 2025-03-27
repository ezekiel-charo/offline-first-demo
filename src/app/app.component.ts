import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  imports: [TodoAddComponent, TodoItemComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private todoService = inject(TodoService);

  todos = this.todoService.getTodos();
}
