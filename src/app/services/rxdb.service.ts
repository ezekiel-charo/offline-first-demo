import { Injectable } from '@angular/core';
import {
  addRxPlugin,
  createRxDatabase,
  RxCollection,
  RxDatabase,
  RxDocument,
} from 'rxdb';
import { RxDBMigrationSchemaPlugin } from 'rxdb/plugins/migration-schema';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { from, shareReplay } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Todo, todoSchema } from '../models/todo';

addRxPlugin(RxDBMigrationSchemaPlugin);

export type TodoDocument = RxDocument<Todo>;
export type TodoCollection = RxCollection<Todo>;
export interface DatabaseCollections {
  todos: TodoCollection;
}
export type TodosDatabase = RxDatabase<DatabaseCollections>;

@Injectable({
  providedIn: 'root',
})
export class RxdbService {
  public todosCollection$ = from(this.initDb()).pipe(shareReplay(1));

  async initDb() {
    const db = await createRxDatabase<DatabaseCollections>({
      name: 'todos',
      storage: getRxStorageDexie(),
    });

    const collections = await db.addCollections({
      todos: {
        schema: todoSchema,
      },
    });

    // Generate unique id for an inserted todo document
    collections.todos.preInsert((doc) => {
      if (!doc.id) {
        doc.id = uuidv4();
      }
    }, false);

    return collections.todos;
  }
}
