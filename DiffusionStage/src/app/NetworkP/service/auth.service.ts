import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/user.model';
import { ApiRestService } from './api-rest.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnInit {
  users: User [] = [];
  usersData : any = [];

public loggedUser!:string;
public isloggedIn: Boolean = false;
public roles!:string;


  constructor(private router: Router, public restapi: ApiRestService) { }

  ngOnInit(): void {
    
  }

  loadUser() {
    this.restapi.getUser().subscribe((data: {}) => {
      console.log(data);
      this.usersData = data;
      for (let u of this.usersData){
        this.users.push(u);
      }
    });
  }

  SignIn(user : User):Boolean{
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if(user.nom=== curUser.nom && user.mdp==curUser.mdp) {
        validUser = true;
      
      this.loggedUser = curUser.nom;
      this.isloggedIn = true;
      this.roles = curUser.groupe;
      localStorage.setItem('loggedUser',this.loggedUser);
      localStorage.setItem('isloggedIn',String(this.isloggedIn));
      }
    });
     return validUser;
  }

  isAdmin():Boolean{
    if (!this.roles) //this.roles== undefiened
       return false;
    return (this.roles.indexOf('ADMIN') >-1);
  }

  logout() { 
    this.isloggedIn = false;
    this.loggedUser = '';
    this.roles = '';
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn',String(this.isloggedIn));
    this.router.navigate(['/login']);
  }
}



