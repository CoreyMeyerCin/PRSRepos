import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { User } from '../../user/user.class';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  requests:Request[]=[];
  
  constructor(private requestsvc:RequestService) { }
  
  ngOnInit(): void {
    this.requestsvc.list().subscribe({
      next:(res) =>{
        this.requests=res;
        console.debug("Requests",res);
      },
      error:(err) =>{
        console.error(err);
      }
    });
  }
  
}
