import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product/product.service';
import { SystemServiceService } from '../../user/system-service.service';
import { VendorService } from '../../vendor/vendor.service';
import { RequestlineService } from '../requestline.service';
import { Request } from '../../request/request.class';
import { Product } from '../../product/product.class';
import { RequestLine } from '../requestline.class';
import { User } from '../../user/user.class';
import { RequestService } from '../../request/request.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-requestline-edit',
  templateUrl: './requestline-edit.component.html',
  styleUrls: ['./requestline-edit.component.css']
})
export class RequestlineEditComponent implements OnInit {
  
  product!: Product;
  requestline!: RequestLine;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private systemsvc: SystemServiceService,
    private vendorsvc: VendorService,
    private productsvc: ProductService,
    private requestlinesvc: RequestlineService
  ) { }

  save(): void {
    this.requestline.productId= +this.requestline.productId;
    this.requestlinesvc.change(this.requestline).subscribe({
      next:(res) => {
        console.debug("RequestLine Added",res);
        this.router.navigateByUrl(`/request/detail/${this.requestline.requestId}`);
      },
      error:(err) =>{
        console.error(err);
      }
    });
  }

  getId():void{
    let id=this.route.snapshot.params["id"];
  }

  refresh(): void {
    let id=this.route.snapshot.params["id"];
    this.requestlinesvc.get(id).subscribe({
      next:(res)=>{
        console.debug("Product updated");
        this.requestline=res;
        this.product=res.product;
      },
      error:(err) => {
        console.error(err);
      }

    })

  }
  
delete():void{
  this.requestlinesvc.remove(+this.requestline).subscribe({
    next:(res)=>{
      console.log("Response from request edit", res);
    },
    error:(err)=>{
      console.log(err);
    }
  })
}


  ngOnInit(): void {
   this.refresh();
  }
}

