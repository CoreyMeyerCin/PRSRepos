import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.class';
import { SystemServiceService } from '../../user/system-service.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {

  request: Request = new Request();
  users: User[] = [];
  
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private requestsvc: RequestService,
    private usersvc: UserService,
    private systemsvc: SystemServiceService
  ) { }

  save(): void {
    this.request.userId = +this.request.userId;
    this.requestsvc.create(this.request).subscribe({
      next:(res) => { 
        console.log("Response from request create", res);
      this.router.navigateByUrl(`/request/list`);
    },
    error:(err) => 
    { console.log(err); }
  });    
  
  }

  ngOnInit() {
    // this.systemsvc.checkIfLoggedIn();
   
    this.usersvc.list().subscribe({
      next:(res) => {
        this.users = this.users;
      }, 
      error:(err) => {
        console.error(err);
      }
    });
    this.request.userId = this.systemsvc._user!.id;
  }
  

}