import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  user: any = {}

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.login(this.user).subscribe({
      next: res => {
        console.log('ok')
      },
      error: err => {
        console.log('erro')
      }
    })
  }


  createUser() {
    this.auth.login(this.user).subscribe({
      next: res => {
        console.log('ok')
      },
      error: err => {
        console.log('erro')
      }
    })
  }

}
