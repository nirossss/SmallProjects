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
export class AccountServiceService {

  constructor(private http: HttpClient) { }

  getAccount(input): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/account/${input}`, httpOptions);
  }

  createRegOp(acc, type, sum): Observable<any> {
    return this.http.post('http://localhost:3000/api/account', {
      accountNumber: acc,
      type: type,
      sum: sum
    }, httpOptions);
  }

  createLoanOp(acc, type, sum, payments, interest): Observable<any> {
    return this.http.post('http://localhost:3000/api/account', {
      accountNumber: acc,
      type: type,
      sum: sum,
      interest: interest,
      payments: payments
    }, httpOptions);
  }
}
