import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { User } from '../../user/user.class';
import { UserService } from '../../user/user.service';
import { Product } from '../../product/product.class';
import { ProductService } from '../../product/product.service';
import { RequestLine } from '../../requestline/requestline.class';
import { RequestlineService } from '../../requestline/requestline.service';
import { SystemServiceService } from '../../user/system-service.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {

  request!:Request;
  verifyDelete:boolean=true;
  user!: User;
  requestLuines: RequestLine[]=[];
  products: Product[]=[];
  denied:boolean = false;

  constructor(private route: ActivatedRoute,
    private router:Router,
    private requestsvc:RequestService,
    private usersvc:UserService,
    private requestlinesvc:RequestlineService,
    private productsvc: ProductService,
    private systemsvc:SystemServiceService

  ){}

  save(): void {
    this.request.rejectionReason = "";
    this.request.status = "REVIEW";
    this.requestsvc.change(this.request).subscribe(
      res => { console.log("Response from request edit", res);
      this.router.navigateByUrl(`/request/detail/${this.request.id}`);
    },
      err => { console.log(err); }
    );
  }

  edit(): void{
    this.router.navigateByUrl(`/request/detail/${this.request.id}`);
  }
  verify():void{
    this.verifyDelete = !this.verifyDelete;
  }
  delete():void{
    this.requestsvc.remove(+this.request).subscribe({
      next:(res)=>{
        console.log("Response from request-edit", res);
        this.router.navigateByUrl(`/request/detail/${this.request.id}`);
      },
      error:(err)=>{
        console.error(err);
      }
    });
  }
  confirmdel():void {
    this.requestsvc.remove(+this.request).subscribe({
      next:(res)=>{
        console.debug("Request is deleted");
        this.router.navigateByUrl(`/request/detail/${this.request.id}`);
      },
      error: (err) =>{
          console.error(err);
      }
    })
  }


  ngOnInit(): void {
    let requestId = this.route.snapshot.params["id"];
    this.requestsvc.get(requestId).subscribe({
      next:(res)=>{
        this.request = res;
        if(this.request.status == "DENIED"){
          this.denied = true;
        }
      },
      
    });
    this.productsvc.list().subscribe({
      next:(res)=>{
        this.products=res;
      },
      error:(err)=>{
        console.error(err);
      }
      
    });
    
  }

}
