import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private rout : Router) { }
  
  setInfo(userId: any){
    localStorage.setItem('id', userId);
  }

  getInfo(){
    return localStorage.getItem('id');
  }

  logOut(){  //로그아웃 기능은 아래와 같은식으로
    localStorage.removeItem('id');
    this.rout.navigateByUrl(''); 
  }

  
  check_login():string{
    var a : any = "";
    if(this.getInfo() == null || this.getInfo() == undefined ){
      return "";
    }else{
      a = this.getInfo()?.toString();
      return a;
    }
      
  }
}
