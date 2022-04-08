import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { User } from '../../user/user.class';
import { UserService } from '../../user/user.service';
import { RequestLine } from '../../requestline/requestline.class';
// import { RequestLineService} from '../../requestlines/requestline.service';
import { SystemServiceService } from '../../user/system-service.service';
import{animate,state,style,transition,trigger} from '@angular/animations';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css'],
  animations: [
    trigger('detailExpand', [
    state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class RequestReviewComponent implements OnInit {

  requests: Request[] = [];
  users: User[] = [];
  sortCriteria: string = "id";
  sortOrder: string = "asc";
  searchCriteria: string = "";
  rid: string="";
  showtable: boolean = false;
  requestlines: RequestLine[] = [];
  idx: number = 0;
  request!: Request;
  showreject: boolean = false;

  constructor(
    private requestsvc: RequestService,
    private usersvc: UserService,
    private systemsvc: SystemServiceService,
  ) { }

  showtbl(id:any) { 
    if(this.showtable) {
      this.showtable = !this.showtable;
    }
    if(this.idx == id) {
      this.idx = 0;
      this.showtable = !this.showtable;    
      return;
    }
    this.idx = id;
    this.showtable = !this.showtable;    
  }  
  showrej() {
    this.showreject = !this.showreject;
  }

  approve(request: Request): void {
    this.requestsvc.approve(request).subscribe({
      next:(res: any) => { 
        console.log("Response from request approve", res);
        this.refresh();
    },
      error:(err: any) => { 
        console.log(err); 
      }
     } );   
    }

  deny(request: Request): void {    
    this.requestsvc.deny(request).subscribe({
      next:(res:any) => { console.log("Response from request deny", res);
      this.refresh();
    },
    error:(err:any) => { 
      console.log(err); }
    });
  }


  refresh(): void {
    this.showtable = false;
    this.showreject = false;
    this.requestsvc.listRevs(this.rid).subscribe({
      next:(res: any) => {
        this.requests = res;
      }, 
      error:(err: any) => {
        console.error(err);
      }
    });
  }


  save(): void {
    this.requestsvc.change(this.request).subscribe({
      next:(res: any) => { 
        console.log("Response from request edit", res);
    },
      error:(err: any) => { 
        console.log(err); }
      });  
  }

  sortBy(prop: string): void {
    if(prop === this.sortCriteria) {
      this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    }
    this.sortCriteria = prop;
  }

 

  ngOnInit() {
    this.systemsvc.checkIfLoggedIn();
    this.requestsvc.listRevs(this.rid).subscribe(
      requests => {
        this.requests = requests;
      }, 
      err => {
        console.error(err);
      }
    );
    this.usersvc.list().subscribe(
      users => {
        this.users = users;
      }, 
      err => {
        console.error(err);
      }
    );
  }

}
