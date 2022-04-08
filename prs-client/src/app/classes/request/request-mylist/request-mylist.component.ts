import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { User } from '../../user/user.class';
import { UserService } from '../../user/user.service';
import { RequestLine } from '../../requestline/requestline.class';
import { RequestlineService } from '../../requestline/requestline.service';
import { SystemServiceService } from '../../user/system-service.service';
import { SearchRequestPipe } from 'src/app/core/pipes/search-request.pipe';

@Component({
  selector: 'app-request-mylist',
  templateUrl: './request-mylist.component.html',
  styleUrls: ['./request-mylist.component.css']
})
export class RequestMylistComponent implements OnInit {

  requests: Request[] = [];
  users: User[]=[];
  sortCriteria: string = "id";
  sortOrder:string = "asc";
  searchCriteria: string="";
  myid:string ="";

  constructor(private requestsvc: RequestService,
    private usersvc:UserService,
    private systemsvc: SystemServiceService) { }

    sortBy(prop:string):void{
      if(prop===this.sortCriteria){
        this.sortOrder= this.sortOrder === 'desc' ? 'asc' : 'desc';
      }
    }

  ngOnInit(): void {
    this.systemsvc.checkIfLoggedIn();
    this.myid = this.systemsvc._user?.id.toString()!;
    this.requestsvc.mylist(this.myid).subscribe({
      next:(res) =>{
        this.requests= res;
      },
      error:(err)=>{
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
    });
  }
    
}
