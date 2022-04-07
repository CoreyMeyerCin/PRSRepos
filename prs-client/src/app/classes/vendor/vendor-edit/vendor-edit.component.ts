import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {

  vendor!:Vendor;

  constructor(private vendorsvc:VendorService,
    private route:ActivatedRoute,
    private router:Router) { }


  save():void{
    this.vendorsvc.change(this.vendor).subscribe({
      next:(res)=>{
        console.debug("Vendors updated");
        this.router.navigateByUrl("/vendors/list");
      },
      error:(err) => {
        console.error(err);
      }
    })
  }

  ngOnInit(): void {
    let id=this.route.snapshot.params["id"];
    this.vendorsvc.get(id).subscribe({
      next:(res)=>{
        console.debug("Customer updated");
        this.vendor=res;
      },
      error:(err) => {
        console.error(err);
      }


    })
  }
}
