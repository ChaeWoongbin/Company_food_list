import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service_item/session.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   id: string = "" ;
   password : string = "";

  constructor(private api: ServiceService, private session : SessionService, private rout: Router) {
  }

  
  login_info$!: Observable< 
    {
      message : string
    }[]
>


  ngOnInit(): void {
  }

  login(){
    this.loginCheck(this.id,this.password);

    if(this.id == 'admin' && this.password == '1234'){ // 하드코딩
      this.session.setInfo(this.id); // 세션에 아이디 정보를 넣어줌(예제니까 간단하게)
      this.rout.navigateByUrl('main'); // 로그인 성공시 이동할 페이지
      return;
    }

    // else if(this.id == '3213' && this.password == '1234'){ // 하드코딩
    //   this.session.setInfo(this.id); // 세션에 아이디 정보를 넣어줌(예제니까 간단하게)
    //   this.rout.navigateByUrl('main'); // 로그인 성공시 이동할 페이지
    //   return;
    // }
  }

  loginCheck(user_id : string, user_password : string) : boolean {

    var result = false;

    var postData = JSON.stringify({user_id: user_id, user_password: user_password});

    this.login_info$ = this.api.post('/api/login/post/login_check',postData) // get mssql
    //this.insert_result$.subscribe(console.log) // console 확인    

    this.login_info$.forEach(data =>{
       var return_value = JSON.stringify(data);
       if(return_value.includes('접속 계정 확인')){  // 데이터 입력 메세지 return 받으면 이동
         //alert(return_value);
         result = true;
         this.session.setInfo(this.id); // 세션에 아이디 정보를 넣어줌(예제니까 간단하게)
         this.rout.navigateByUrl('main'); // 로그인 성공시 이동할 페이지
       }else{
        alert("서버 로그인 실패! : id 혹은 password를 확인해주세요");
       }
    });

    return result;
  }
}
