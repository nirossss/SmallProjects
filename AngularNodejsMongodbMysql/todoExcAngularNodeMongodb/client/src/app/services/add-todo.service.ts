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
export class AddTodoService {

  constructor(private http: HttpClient) { }

  getFamily(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/family', httpOptions);
  }

  addTodo(id: string, input: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/todos', {
      inCharge: id,
      description: input
    }, httpOptions);
  }
}
