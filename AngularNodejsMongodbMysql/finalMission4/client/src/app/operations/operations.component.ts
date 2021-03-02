import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../services/account-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  isLoan = false

  constructor(
    private accountService: AccountServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  checkChange(type): void {
    if (type === 'loan') {
      this.isLoan = true;
      return
    }
    this.isLoan = false;
  }

  regOp(acc, type, sum): void {
    this.accountService.createRegOp(acc, type, sum).subscribe((res) => {
      this.router.navigate(['/login']);
    });
  }

  loanOp(acc, type, sum, payments, interest): void {
    this.accountService.createLoanOp(acc, type, sum, payments, interest).subscribe((res) => {
      this.router.navigate(['/login']);
    });
  }

}
