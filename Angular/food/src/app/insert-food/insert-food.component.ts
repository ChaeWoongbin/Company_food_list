import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import {NgbDatepicker, NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../service_item/session.service';

@Component({
  selector: 'app-insert-food',
  templateUrl: './insert-food.component.html',
  styleUrls: ['./insert-food.component.css']
})
export class InsertFoodComponent implements OnInit {
  
  input_date!: NgbDateStruct;

  members:number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  
  cpartList$: Observable< 
    {
      n_name: string
    }[]
>
 
 input_time : string = '';
 input_cpart : string = '';
 input_count : string = '';
 input_seq : string = '';
 input_place: string = '';
 input_temp : string ='';

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
    date: string
}[]
>

// 이전 날짜 등록 X
minDate! :NgbDateStruct;

constructor(private api: ServiceService, private router: Router, private session : SessionService, private config: NgbDatepickerConfig) {
  this.cpartList$ = this.api.get('/api/get/depart')
  this.insert_info$ = this.api.get('/')
  // 이전 날짜 등록 X
  const current = new Date();
  this.minDate = {
    year: current.getFullYear(),
    month: current.getMonth() + 1,
    day: current.getDate()
  };
}

  id : string = '';
  NowDate : string = '';

  ngOnInit(): void {
    this.SetNowTime();
    this.id = this.session.check_login();
  }

  SetNowTime(){    
    const now = new Date();
    this.NowDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString();
  }

  // 등록버튼 클릭
  click_search(input_date:NgbDateStruct, input_cpart : string, input_count : string, input_seq : string, input_place : string, input_temp : string ): void{

    if( input_date === undefined ){
      alert('일자가 선택되지 않았습니다.');
      return
    }

    if( input_cpart.length < 1 ){
      alert('부서가 선택되지 않았습니다.');
      return
    }

    if( input_count.length < 1 ){
      alert('인원이 선택되지 않았습니다.');
      return
    }

    if( input_seq.length < 1 ){
      alert('구분이 선택되지 않았습니다.');
      return
    }

    if( input_place.length < 1 ){
      alert('식당이 선택되지 않았습니다.');
      return
    }

    
    // 당일 신청 시간 제한
    const check_date = new Date();

    //alert(new Date(check_date.getTime()).getHours().toString());

   // var input_date_value = this.NowDate.toString().substring(0,4) + this.NowDate.toString().substring(5,7) + this.NowDate.toString().substring(8,10);

   var pad = "0"; // 날짜 자리수 맞추기
   var set_month = (pad + this.input_date.month.toString()).substring((pad.length + this.input_date.month.toString()).length-2 ,(pad.length + this.input_date.month.toString()).length);
   var set_day = (pad + this.input_date.day.toString()).substring((pad.length + this.input_date.day.toString()).length-2 ,(pad.length + this.input_date.day.toString()).length)
   //var set_day = pad + this.input_date.day.toString().substr(0,3);


   var input_date_value = this.input_date.year.toString() + set_month + set_day;

    // nowdate 확인
    var check_nowDate = this.NowDate.substring(0,4) + this.NowDate.substring(5,7) + this.NowDate.substring(8,10);
    
    if(input_date_value == check_nowDate){
        // 점심 신청 시간 10 시    
        if(input_seq == 'L' && new Date(check_date.getTime()).getHours() >= 10){
          alert('당일 점심식수는 10시 이전까지 신청 가능합니다 !');
          return;
        }
    
        
        // 점심 신청 시간 14시 30분
        if(input_seq == 'D' && new Date(check_date.getTime()).getHours() > 14){
          alert('당일 저녁식수는 14시 30분 이전까지 신청 가능합니다 !');
          return;
        }  

        if(input_seq == 'D' && new Date(check_date.getTime()).getHours() == 14 && new Date(check_date.getTime()).getMinutes() > 30 ){
          alert('당일 저녁식수는 14시 30분 이전까지 신청 가능합니다 !');
          return;
        }  
    }
    
   //alert(input_date_value);
   
    // 등록자
    var user = this.session.check_login();

    var postData = JSON.stringify({date:input_date_value,cpart:input_cpart,user_skey:user,seq:input_seq,count:input_count,place:input_place,temp:input_temp,db:'c_food'});

    this.insert_result$ = this.api.post('/api/food/post/insert_food',postData) // get mssql
    //this.insert_result$.subscribe(console.log) // console 확인    

    this.insert_result$.forEach(data =>{
       var return_value = JSON.stringify(data);
       if(return_value.includes('데이터')){  // 데이터 입력 메세지 return 받으면 이동
         //alert(return_value);
         this.router.navigate(['/main']);
         alert('식수 등록');
       }else{
         alert('등록 실패');
       }

         console.log(return_value);
    });
   }

}
