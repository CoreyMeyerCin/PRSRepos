import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../product/product.class';
import { ProductService } from '../../product/product.service';
import { RequestService } from '../../request/request.service';
import { RequestLine } from '../requestline.class';
import { RequestlineService } from '../requestline.service';
import { Request } from '../../request/request.class';
import { SystemServiceService } from '../../user/system-service.service';


@Component({
  selector: 'app-requestline-create',
  templateUrl: './requestline-create.component.html',
  styleUrls: ['./requestline-create.component.css']
})
export class RequestlineCreateComponent implements OnInit {

  requestline:RequestLine= new RequestLine();
  request!:Request;
  products:Product[]=[];
  total:number=0;
  product!:Product;
  requestId!:string;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private requestsvc:RequestService,
    private requestlinesvc: RequestlineService,
    private productsvc: ProductService,
    private systemsvc: SystemServiceService//check for log in here
  ) { }

  save():void{
    this.requestline.requestId = Number(this.requestId);
    this.request.status = "REVIEW";
    this.requestlinesvc.create(this.requestline).subscribe({
      next:(res)=>{
        console.log("Response from Requestline create", res);
        this.router.navigateByUrl(`/requests/detail/${this.request.id}`);
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.params["id"];

    this.requestsvc.get(this.requestId).subscribe({
      next:(res) =>{
        this.request=res
      }
    });
    this.systemsvc.checkIfLoggedIn();
    this.productsvc.list().subscribe({
      next:(res)=>{
        this.products = res;
        console.log("Products", this.products);
      },
      error:(err)=>{
        console.error(err);
      }
    });

  }

}
