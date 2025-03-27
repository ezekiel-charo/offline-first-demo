import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-add',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.scss',
})
export class TodoAddComponent {
  private todoService = inject(TodoService);
  todo = new FormControl();

  addTodo(): void {
    if (!this.todo.value) {
      return;
    }

    const todo: Partial<Todo> = { task: this.todo.value, checked: false };
    this.todoService.addTodo(todo).subscribe(() => {
      this.todo.reset();
    });
  }
}
