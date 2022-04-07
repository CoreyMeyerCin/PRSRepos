import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  login:string="";
  password:string="";

  constructor(private usersvc:UserService,
    private router:Router) { }



  submit(): void {
    this.usersvc.login(this.login, this.password).subscribe({
      next:(res)=>{
        console.log("Login successful!");
        this.router.navigateByUrl("/vendor/list");
        
        // this.http.post<User>;
      },
      error:(err) => {
        console.error("Login unsucessful!");
      }
    })
  }
  //system.sercive.store the user instsance in here. Inject the system service into all
  //of the components

  ngOnInit(): void {
  }

}
