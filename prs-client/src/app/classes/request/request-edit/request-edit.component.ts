import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../user/user.class';
import { UserService } from '../../user/user.service';
import { RequestService } from '../request.service';
import { Request } from '../request.class';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {

  request!:Request;
  users!: User[];

  constructor(private requestsvc: RequestService,
    private usersvc: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

    save(): void {
      this.request.userId = +this.request.userId;
      this.requestsvc.change(this.request).subscribe({
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
    let id=this.route.snapshot.params["id"];
    this.requestsvc.get(id).subscribe({
      next:(res)=>{
        console.debug("Customer updated");
        this.request=res;
      },
      error:(err) => {
        console.error(err);
      }


    })
  }
}
