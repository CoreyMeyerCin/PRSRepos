import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { VendorService } from '../../vendor/vendor.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';
import { Vendor } from '../../vendor/vendor.class';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  
  product:Product=new Product();
  vendors!:Vendor[];

  constructor(private productsvc: ProductService,
    private vendorsvc: VendorService,
    private router:Router
    ) { }


    save(): void {
      this.product.vendorId = +this.product.vendorId;
      this.productsvc.create(this.product).subscribe({
        next:(res) => {
          console.debug("Product added");
          this.router.navigateByUrl("/product/list");
        },
        error:(err) =>{
          console.error(err);
        }
      })
    } 

  ngOnInit(): void {
    this.vendorsvc.list().subscribe({
      next:(res) =>{
        console.debug("Customers",res);
        this.vendors=res;
      }
    })
}

  

}
