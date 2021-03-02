import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../services/account-service.service'

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.css']
})
export class LoginAccountComponent implements OnInit {
  accountData = []
  isLogin = true
  isData = false

  constructor(private accountService: AccountServiceService) { }

  ngOnInit(): void {
  }

  connectAccount(input): void {
    this.accountService.getAccount(input).subscribe(({ docs }) => {
      this.accountData = docs
      this.isLogin = false
      this.isData = true
    });
  }

  trackById(index: number, item: any): number {
    return item._id;
  }

}
