import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { RequestService } from '../request.service';
import { User } from '../../user/user.class';
import { Request } from '../request.class';
import { SystemServiceService } from '../../user/system-service.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {

  request: Request = new Request();
  users!:User[];

  constructor(private usersvc: UserService,
    private requestsvc: RequestService,
    private router:Router,
    private systemsvc: SystemServiceService) { }

    save(): void {
      this.request.userId = +this.request.userId;
      this.requestsvc.create(this.request).subscribe({
        next:(res) => {
          console.debug("Request added");
          this.router.navigateByUrl("/request/list");
        },
        error:(err) =>{
          console.error(err);
        }
      })
    } 

  ngOnInit(): void {
    this.usersvc.list().subscribe({
      next:(res)=>{
        console.debug("Users",res);
        this.users=res;
      }
    });
    this.systemsvc.checkIfLoggedIn();
    this.request.user=this.systemsvc.getLoggedInUser()!;
  }

}
