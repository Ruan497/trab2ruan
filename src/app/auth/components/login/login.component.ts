import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {}

  constructor(
    private auth: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.auth.login(this.user).subscribe({
      next: res => {
        console.log('ok')
        this.route.navigate(['dash1'])
        
      },
      error: err =>{
        console.log('erro')
      }
    })
  }

}
