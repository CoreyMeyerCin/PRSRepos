import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  vendor!:Vendor;

  constructor(private vendorsvc: VendorService,
    private route:ActivatedRoute,
    private router: Router) { }


    showVerifyButton: boolean = false;
    remove(): void{
      this.showVerifyButton = !this.showVerifyButton;
      
    }
    verifyRemove():void {
      this.showVerifyButton=false;
      this.vendorsvc.remove(this.vendor.id).subscribe({
        next:(res)=>{
          console.debug("Vendor is deleted");
        this.router.navigateByUrl("/vendor/list");
        },
        error: (err) =>{
            console.error(err);
        }
      })
    }

 
    ngOnInit(): void {
      let id=+this.route.snapshot.params["id"];
     this.vendorsvc.get(id).subscribe({
       next:(res)=>{
         console.debug("User", res);
         this.vendor=res;
       }
     })
   }

}
