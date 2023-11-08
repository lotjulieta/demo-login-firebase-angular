import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
    providedIn: 'root'
  })
  export class PagesGuard {
    constructor(private UsersService:UsersService, private router:Router){
    }
    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.UsersService.verificarAdmin().then(res=>{
          if(res){
            return true;
          }else{
            this.router.navigateByUrl("login");
            return false;
          }
        });
    }
    
  }