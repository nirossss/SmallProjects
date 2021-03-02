import { Component, OnInit } from '@angular/core';
import { AddTodoService } from '../../services/add-todo.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  familyArr: [] = []

  constructor(
    private addTodosService: AddTodoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addTodosService.getFamily().subscribe(({ docs }) => {
      this.familyArr = docs;
    });
  }

  newTodo(id, input): void {
    this.addTodosService.addTodo(id, input).subscribe((res) => {
      this.router.navigate(['/todoList']);
    });
  }

  trackById(index: number, item: any): number {
    return item._id;
  }

}
