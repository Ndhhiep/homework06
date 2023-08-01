import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private loginServices: LoginService, private router: Router) {}

  async login(){
    let loginResult = await this.loginServices.loginWithGoogle();
    if(loginResult == null){
      console.log('Login failed');
    }else{
      console.log('Login success');
      this.router.navigate(['/chat']);
    }

  }
}
