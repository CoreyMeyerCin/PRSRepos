import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {

  vendor:Vendor=new Vendor();
  constructor(private vendorsvc: VendorService,
    private router:Router) { }

    save():void{
      this.vendorsvc.create(this.vendor).subscribe({
        next:(res)=>{
          console.debug("Vendor added");
          this.router.navigateByUrl("/vendor/list");
        },
        error:(err)=>{
          console.error(err);
        }
      })
    }

    ngOnInit(): void {
      this.vendorsvc.list().subscribe({
        next:(res)=>{
          console.debug("Vendors",res);
        },
        error:(err)=>{
          console.error(err);
        }
      })
    }
}
