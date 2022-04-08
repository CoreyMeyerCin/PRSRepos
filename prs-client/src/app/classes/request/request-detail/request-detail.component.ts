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

    refresh():void{
      let requestId=this.route.snapshot.params["id"];
      this.requestsvc.get(requestId).subscribe({
        next:(res)=>{
          this.request=res;
        },
        error:(err)=>{
          console.error(err);
        }
      })
    }

    updateline(requestline:RequestLine):void{
      this.request.rejectionReason="";
      this.request.status="REVIEW";
      this.requestlinesvc.change(requestline).subscribe({
        next:(res)=>{
          console.log("response from the Requestline-edit",res);
        },
        error:(err)=>{
          console.error(err);
        }
      })
    }

    deleteline(requestline:RequestLine):void{
      this.request.rejectionReason="";
      this.request.status="REVIEW";
      this.requestlinesvc.remove(+requestline).subscribe({
        next:(res)=>{
          console.log("Response from RequestLine-Delete", res);
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

  ngOnInit(): void {
    // this.systemsvc.checkIfLoggedIn();
    let requestId = this.route.snapshot.params["id"];
    this.requestsvc.get(requestId).subscribe({
      next:(res)=>{
        this.request=res;
        if(this.request.status == "DENIED"){
          this.denied = true;
        }
      },
      error:(err)=>{
        console.error(err);
      }
    });
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
