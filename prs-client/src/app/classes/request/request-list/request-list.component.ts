import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { User } from '../../user/user.class';
import { UserService } from '../../user/user.service';
import { RequestLine } from '../../requestline/requestline.class';
import { RequestlineService } from '../../requestline/requestline.service';
import { SystemServiceService } from '../../user/system-service.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  requests:Request[]=[];
  users: User[]=[];
  sortCriteria:string="id";
  sortOrder:string="asc";
  searchCriteria:string ="";
  
  constructor(private requestsvc:RequestService,
    private usersvc:UserService,
    public systemsvc:SystemServiceService) { }

    sortBy(prop:string):void{
      if(prop===this.sortCriteria){
        this.sortOrder = this.sortOrder === 'des'?'asc':'desc';
      }
      this.sortCriteria = prop;
    }

    
  
  ngOnInit(): void {
    // this.systemsvc.checkIfLoggedIn();
    this.requestsvc.list().subscribe({
      next:(res) =>{
        this.requests=res;
        console.debug("Requests",res);
      },
      error:(err) =>{
        console.error(err);
      }
    });
    this.usersvc.list().subscribe({
      next:(res)=>{
        this.users=res;
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }
  
}
