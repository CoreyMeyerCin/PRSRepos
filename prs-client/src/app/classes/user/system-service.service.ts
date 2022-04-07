import { Injectable } from '@angular/core';
import { User } from './user.class';
import{AppInitService} from 'src/app/app-init.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemServiceService {
  baseUrl:string="http://localhost:14154/api/users";

  _user!: User |null;

  constructor(
    private appinit: AppInitService,
    private router:Router

    ) { }



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
