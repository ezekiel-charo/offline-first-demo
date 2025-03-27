import { Component, inject, input } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  todo = input<Todo>();

  private todoService = inject(TodoService);

  deleteTodo(): void {
    const todoId = this.todo()?.id;
    console.log('delete', todoId);

    if (confirm('Delete item?') && todoId) {
      this.todoService.deleteTodo(todoId).subscribe();
    }
  }
}
