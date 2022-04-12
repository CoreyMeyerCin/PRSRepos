import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ActivationEnd,Navigation, Route } from '@angular/router';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { RequestlineService } from '../../requestline/requestline.service';
import { RequestLine } from '../../requestline/requestline.class';
import { SystemServiceService } from '../../user/system-service.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.class';


@Component({
  selector: 'app-request-detail',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {

  request!: Request;
  requests:Request[]=[];
  users: User[]=[];
  sortCriteria:string="id";
  sortOrder:string="asc";
  searchCriteria:string ="";
  showVerificationButton:boolean = false;
  
  constructor(private requestsvc:RequestService,
    private usersvc:UserService,
    private route: ActivatedRoute,
    private router: Router,
    public systemsvc:SystemServiceService) { }
  
    sortBy(prop:string):void{
      if(prop===this.sortCriteria){
        this.sortOrder = this.sortOrder === 'des'?'asc':'desc';
      }
      this.sortCriteria = prop;
    }
  
  
    edit(requestline:RequestLine): void{
      this.router.navigateByUrl(`/requestlines/edit/${requestline.id}`)
    }

    review(): void{
      this.requestsvc.review(this.request).subscribe({
        next:(res)=>{
          console.debug("Review", res);
          this.refresh();
        },
          error:(err)=>{
            console.error(err);
          }
      })
    }

    remove(requestline:RequestLine):void{
      this.requestsvc.remove(requestline.id).subscribe({
        next:(res) =>{
          console.debug("Requestline removed");
          this.refresh();
        }
      });
    }
    

    approve(request:Request):void{
      
      this.requestsvc.approve(request).subscribe({
        next:(res) =>{
          console.debug("Approved request",res);
          this.refresh();
          
        },
        error:(err)=>{
          console.error(err);
        }
      })
    }


    reject(): void {
      this.showVerificationButton = !this.showVerificationButton;
    }
    verifyReject(request:Request):void{
      this.requestsvc.reject(request).subscribe({
        next:(res) =>{
          console.debug("Rejected request",res);
          this.refresh();
          
        },
        error:(err)=>{
          console.error(err);
          
        }
      })
    }


    refresh():void{
      let userId = this.systemsvc._user!.id;
      this.requestsvc.reviews(userId).subscribe({
        next:(res)=>{
          console.debug("Request", res);
          this.requests=res;
        },
        error:(err)=>{
          console.error(err);
        }
      });
    
    }
    

  ngOnInit(): void {
    this.refresh();
}
}
