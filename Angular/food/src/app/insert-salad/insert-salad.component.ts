import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import {NgbDatepicker, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../service_item/session.service';

@Component({
  selector: 'app-insert-salad',
  templateUrl: './insert-salad.component.html',
  styleUrls: ['./insert-salad.component.css']
})
export class InsertSaladComponent implements OnInit  {

  members:number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  
  
 input_time : string = '';
 input_cpart : string = '';
 input_count : string = '';
 input_seq : string = '';
 input_place: string = '';
 input_temp : string ='';


  cpartList$: Observable< 
    {
      n_name: string
    }[]
>

  insert_info$: Observable< 
  {
      date: string
      cpart: string
      user_skey: string
      seq: string
      count: string
      place: string
      temp: string
      db: string
  }[]
  >

  insert_result$!: Observable< 
  {
    result: string
  }[]
  >

  test!:object

constructor(private api: ServiceService, private router: Router, private session : SessionService) {
  this.cpartList$ = this.api.get('/api/get/depart')
  this.insert_info$ = this.api.get('/')
}
  
  NowDate : string = '';
  startDate : string = '';
  endDate : string = '';
  
  id : string = '';

  ngOnInit(): void {
    
    this.SetNowTime();
    this.id = this.session.check_login();
  }

  SetNowTime(){    
    const now = new Date();
    this.NowDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString();    
    const cal_date = new Date(now.getTime());
    this.startDate = new Date(cal_date.setDate(cal_date.getDate() + 4)).toISOString().substring(0,10);
    this.endDate = new Date(cal_date.setDate(cal_date.getDate() + 4)).toISOString().substring(0,10);
  }
  
  // 등록버튼 클릭
  click_search(input_cpart : string, input_count : string, input_seq : string, input_place : string, input_temp : string ): void{

    if( input_cpart.length < 1 ){
      alert('부서가 선택되지 않았습니다.');
      return;
    }

    if( input_count.length < 1 ){
      alert('인원이 선택되지 않았습니다.');
      return;
    }

    if( input_seq.length < 1 ){
      alert('구분이 선택되지 않았습니다.');
      return;
    }

    if( input_place.length < 1 ){
      alert('식당이 선택되지 않았습니다.');
      return;
    }
    
    if( input_temp.length < 1 ){
      alert('신청자 기입이 필요합니다.');
      return;
    }

    // 샐러드 신청 시간 제한
    const check_date = new Date();

    // 샐러드는 목요일만 신청 가능
    if(new Date(check_date.getTime()).getDay() != 4){
      alert('샐러드는 목요일에만 신청 가능합니다 !');
      return;
    }    

    //alert(new Date(check_date.getTime()).getHours().toString());
    
    // 샐러드 신청 시간 10 ~ 14 시
    // && 연산자 X
    if(new Date(check_date.getTime()).getHours() < 10 ){
      alert('샐러드는 10시 ~ 14시 사이에 신청 가능합니다 !');
      return;
    }
    else if(new Date(check_date.getTime()).getHours() >= 14){
      alert('샐러드는 10시 ~ 14시 사이에 신청 가능합니다 !');
      return;
    }
    
    // 날짜
    var input_date_value = this.startDate.substring(0,4) + this.startDate.substring(5,7) + this.startDate.substring(8,10);

    // 등록자
    var user = this.session.check_login();
   
    var postData = JSON.stringify({date:input_date_value,cpart:input_cpart,user_skey:user,seq:input_seq,count:input_count,place:input_place,temp:input_temp,db:'c_salad'});

    this.insert_result$ = this.api.post('/api/food/post/insert_food',postData) // get mssql


    // api 응답시 insert 확인 처리
    this.insert_result$.forEach(data =>{
       var return_value = JSON.stringify(data);
       if(return_value.includes('데이터')){  // 데이터 입력 메세지 return 받으면 이동
         //alert(return_value);
         alert('샐러드 등록');
         this.router.navigate(['/main']);
       }else{
         alert('등록 실패');
       }
         console.log(return_value);
    });
  }
}
