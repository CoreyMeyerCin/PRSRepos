import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user!:User;


  constructor(private usersvc: UserService,
    private route:ActivatedRoute,
    private router: Router
    ) { }

    showVerifyButton: boolean = false;
    remove(): void{
      this.showVerifyButton = !this.showVerifyButton;
      
    }
    verifyRemove():void {
      this.showVerifyButton=false;
      this.usersvc.remove(this.user.id).subscribe({
        next:(res)=>{
          console.debug("User is deleted");
        this.router.navigateByUrl("/user/list");
        },
        error: (err) =>{
            console.error(err);
        }
      })
    }
    


  ngOnInit(): void {
     let id=+this.route.snapshot.params["id"];
    this.usersvc.get(id).subscribe({
      next:(res)=>{
        console.debug("User", res);
        this.user=res;
      }
    })
  }

}
