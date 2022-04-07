import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Request } from '../request.class';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  request!:Request;
  constructor(private requestsvc: RequestService,
    private route:ActivatedRoute,
    private router: Router) { }

    showVerifyButton: boolean = false;
    remove(): void{
      this.showVerifyButton = !this.showVerifyButton;
      
    }

    verifyRemove():void {
      this.showVerifyButton=false;
      this.requestsvc.remove(this.request).subscribe({
        next:(res)=>{
          console.debug("Request is deleted");
        this.router.navigateByUrl("/request/list");
        },
        error: (err) =>{
            console.error(err);
        }
      })
    }

  ngOnInit(): void {
    let id=+this.route.snapshot.params["id"];
     this.requestsvc.get(this.request.id.toString()).subscribe({
       next:(res)=>{
         console.debug("User", res);
         this.request=res;
       }
     })
   }
}
