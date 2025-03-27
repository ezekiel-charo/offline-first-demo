import { inject, Injectable } from '@angular/core';
import { RxdbService } from './rxdb.service';
import { from, switchMap } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private db = inject(RxdbService);

  getTodos() {
    return this.db.todosCollection$.pipe(
      switchMap((collection) => collection.find().$)
    );
  }

  addTodo(todo: Partial<Todo>) {
    return this.db.todosCollection$.pipe(
      switchMap((collection) => from(collection.insert(todo)))
    );
  }

  updateTodo(todo: Todo) {
    return this.db.todosCollection$.pipe(
      switchMap((collection) => from(collection.upsert(todo)))
    );
  }

  deleteTodo(todoId: string) {
    return this.db.todosCollection$.pipe(
      switchMap((collection) => from(collection.bulkRemove([todoId])))
    );
  }
}
