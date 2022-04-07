import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user:User=new User();
  constructor(private usersvc: UserService,
    private router: Router) { }

    save():void{
      this.usersvc.create(this.user).subscribe({
        next:(res)=>{
          console.debug("User added");
          this.router.navigateByUrl("/user/list");
        },
        error:(err)=>{
          console.error(err);
        }
      })
    }

  ngOnInit(): void {
    this.usersvc.list().subscribe({
      next:(res)=>{
        console.debug("Users",res);
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

}
