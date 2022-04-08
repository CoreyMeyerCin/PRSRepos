import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Routes, RouterModule, ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user.class';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SystemServiceService {
  baseUrl:string="http://localhost:14154/api/users";

  _user!: User |null;

  constructor(private http: HttpClient,
    private router:Router,
    public usersvc: UserService
    ) { }

    checkAdmRev(){
      if(this._user!.isAdmin == false && this._user!.isReviewer ==false || this._user == null){
        this.router.navigateByUrl('/home');
      }
    }
    checkAdmin(){
      if(this._user!.isAdmin == false){
        this.router.navigateByUrl('/home')
      }
    }

    getLoggedInUser():User|null{
      return this._user;
    }

    setLoggedInUser(user:User):void{
      this._user =user;
        }

    clearLoggedInUser():void{
      this._user=null;
    }

    checkIfLoggedIn(): void{
      if(this._user==null){
        this.router.navigateByUrl('/login');
      }
    }
}
