import { Component, OnInit } from '@angular/core';
import { Product } from '../product.class';
import { ProductService } from '../product.service';
import { Vendor } from '../../vendor/vendor.class';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[]=[];

  constructor(private productsvc:ProductService) { }

  ngOnInit(): void {
    this.productsvc.list().subscribe({
      next:(res) =>{
        this.products=res;
        console.debug("Requests",res);
      },
      error:(err) =>{
        console.error(err);
      }
    });
  }
}
