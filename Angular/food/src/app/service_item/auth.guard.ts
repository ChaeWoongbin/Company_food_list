import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private session : SessionService, private rout: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var info : any = this.session.getInfo();
    if(info != null && info != ""){
      console.log(info);
      // alert("로그인 성공 : " + info);
      return true;
    }
     alert("로그인이 필요합니다");
    this.rout.navigateByUrl('/login');
    return false;
  }
}
