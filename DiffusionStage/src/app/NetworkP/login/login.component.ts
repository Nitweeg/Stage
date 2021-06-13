import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/user.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user=new User('','','','','');

  constructor(private authService : AuthService,
    public router: Router) { }

  ngOnInit(): void {
    this.authService.loadUser();
  }

  onLoggedin(){
    console.log(this.user)
    let isValidUser: Boolean = this.authService.SignIn(this.user);
    console.log("valid user "+isValidUser);
    if (isValidUser)
    {
      this.router.navigate(['/index']);     
    }
      else
        alert('Login ou mot de passe incorrecte!');
  }

}
