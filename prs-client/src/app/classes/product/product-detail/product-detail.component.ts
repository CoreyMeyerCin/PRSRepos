import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product!:Product;

  constructor(private productsvc: ProductService,
    private route: ActivatedRoute,
    private router:Router) { }

    showVerifyButton:boolean=false;



    remove():void{
      this.showVerifyButton=!this.showVerifyButton;
    }

    verifyRemove():void{
      this.showVerifyButton = !this.showVerifyButton;
      this.productsvc.remove(this.product.id).subscribe({
        next:(res)=>{
          console.debug("Prodcut is deleted");
        this.router.navigateByUrl("/product/list");
        },
        error: (err) =>{
            console.error(err);
        }
      })
    }


  ngOnInit(): void {
    let id=+this.route.snapshot.params["id"];
    this.productsvc.get(id).subscribe({
      next:(res)=>{
        console.debug("User", res);
        this.product=res;
      }
    })
  }
}
