import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todosArr: [] = []

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.setTodosData();
  }

  deleteTodo(todoId): void {
    this.todosService.delTodo(todoId).subscribe((res) => {
      this.setTodosData();
    });
  }

  setTodosData(): void {
    this.todosService.getTodos().subscribe(({ data }) => {
      this.todosArr = data;
    });
  }

  trackById(index: number, item: any): number {
    return item._id;
  }

}
