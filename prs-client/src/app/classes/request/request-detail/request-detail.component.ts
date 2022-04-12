import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Navigation } from '@angular/router';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { RequestlineService } from '../../requestline/requestline.service';
import { RequestLine } from '../../requestline/requestline.class';
import { SystemServiceService } from '../../user/system-service.service';
import { Product } from '../../product/product.class';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  request!:Request;
  requsetlines: RequestLine[]=[];
  requestline!: RequestLine;
  product!:Product;
  products:Product[]=[];
  denied:boolean=false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private requestsvc:RequestService,
    private requestlinesvc: RequestlineService,
    private systemsvc: SystemServiceService,
    private productsvc: ProductService
  ) { }


    review():void{
      this.requestsvc.review(this.request).subscribe({
        next:(res) =>{
          console.debug("Reviewed request",res);
          this.refresh();
          
        },
        error:(err)=>{
          console.error(err);
        }
      })
    }

    goRlCreate(request:Request){
      this.router.navigateByUrl(`/requestlines/create/${request.id}`);
    }

    addLine(request:Request){
      this.requestline=new RequestLine();
      this.requestline.requestId = request.id;
      this.requestlinesvc.create(this.requestline).subscribe({
        next:(res)=>{
          console.log("Response from the requestline-create(newline) button",res)
          
        },
        error:(err)=>{
          console.error(err);
        }
      })
    }

  

    updateline(requestline:RequestLine):void{
     this.router.navigateByUrl(`/requestlines/edit/${requestline.id}`)
    }

    deleteline(requestline:RequestLine):void{
      this.requestlinesvc.remove(requestline.id).subscribe({
        next:(res)=>{
          console.log("Response from RequestLine-Delete", res);
          this.refresh();
        },
        error:(err)=>{
          console.error(err);
        }
      })
    }

    save():void{
      this.request.rejectionReason="";
      this.request.status="REVIEW";
      this.requestsvc.change(this.request).subscribe({
        next:(res)=>{
          console.log("Response fomr Request-Save",res);
        },
        error:(err)=>{
          console.error(err);
        }
      })
    }
refresh(): void{
  let id = this.route.snapshot.params["id"];

  this.requestsvc.get(id).subscribe({
    next:(res)=>{
      console.debug(res);
      this.request=res;
      
      },
    error:(err)=>{
      console.error(err);
    }
  });
}

toReviews():void{
  this.router.navigateByUrl(`/request/reviews/${this.request.user.id}`)
}

  ngOnInit(): void {
  
   this.refresh();
    this.productsvc.list().subscribe({
      next:(res)=>{
        this.products=res;
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }
}
