import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/todos', httpOptions);
  }

  delTodo(id: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/todos/delete', {
      todoId: id
    }, httpOptions);
  }

}
