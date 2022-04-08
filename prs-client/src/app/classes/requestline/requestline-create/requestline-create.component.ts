import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../product/product.class';
import { ProductService } from '../../product/product.service';
import { SystemServiceService } from '../../user/system-service.service';
import { RequestLine} from '../requestline.class';
import { RequestlineService } from '../requestline.service';

@Component({
  selector: 'app-requestline-create',
  templateUrl: './requestline-create.component.html',
  styleUrls: ['./requestline-create.component.css']
})
export class RequestlineCreateComponent implements OnInit {

  requestline: RequestLine =new RequestLine();
  products!: Product[];

  constructor(
    private systemsvc: SystemServiceService,
    private requestlinesvc: RequestlineService,
    private productdsvc: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  save(): void {
    this.requestlinesvc.create(this.requestline).subscribe({
      next:(res)=> {
        console.log("Requestline",res);
        this.router.navigateByUrl(`/request/detail/${this.requestline.requestId}`)
      },
      error:(err)=>{
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    this.systemsvc.checkIfLoggedIn();
    this.requestline.requestId=+ this.route.snapshot.params["id"];
    this.productdsvc.list().subscribe({
      next:(res)=>{
        console.log("Product", res);
        this.products = res;
      },
      error:(err)=>{
        console.error(err);
      }
    });
    this.requestline.requestId=+this.requestline.requestId;
  }

}