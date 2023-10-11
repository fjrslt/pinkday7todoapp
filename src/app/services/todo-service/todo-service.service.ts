import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  private todoStorageKey = 'todos';

  constructor() { }

  // Get all ToDos
  getTodos(): string[] {
    const todosJson = localStorage.getItem(this.todoStorageKey);
    return todosJson ? JSON.parse(todosJson) : [];
  }

  // Add ToDo
  addTodo(todoItem: string): void {
    const currentTodos = this.getTodos();
    currentTodos.push(todoItem);
    localStorage.setItem(this.todoStorageKey, JSON.stringify(currentTodos));
  }

  // Get ToDo by index
  getTodoByIndex(index: number): string {
    const currentTodos = this.getTodos();
    if (index >= 0 && index < currentTodos.length) {
        return currentTodos[index];
    }
    return ''; // Return an empty string if the index is out of bounds
  }

  // Edit ToDo by index
  editTodo(index: number, newText: string): void {
    const currentTodos = this.getTodos();
    if (index >= 0 && index < currentTodos.length) {
        currentTodos[index] = newText;
        localStorage.setItem(this.todoStorageKey, JSON.stringify(currentTodos));
    }
  }

  // Remove a ToDo by index
  removeTodo(index: number): void {
    const currentTodos = this.getTodos();
    if (index >= 0 && index < currentTodos.length) {
        currentTodos.splice(index, 1);
        localStorage.setItem(this.todoStorageKey, JSON.stringify(currentTodos));
    }
  }
}
