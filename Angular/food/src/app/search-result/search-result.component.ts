import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { reduce } from 'rxjs/operators';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  
  result$!: Observable< 
    {
      date: string // 일자
      cpart: string // 부서
      user_skey : string // 등록자
      seq : string // 식사시간
      count : string // 인원
      place : string // 사업장
      temp : string // 비고
    }[]
  >

  result_salad$!: Observable< 
    {
      date: string // 일자
      cpart: string // 부서
      user_skey : string // 등록자
      seq : string // 식사시간
      count : string // 인원
      place : string // 사업장
      temp : string // 비고
    }[]
  >

  total_food : number = 0;

  total_salad : number = 0;

  place : string = ''; // 사업장
  seq : string = ''; // 시간
  date : string = ''; // 일자 검색
  salad_date : string = ''; // 샐러드 일자 검색

  constructor(private api: ServiceService, router : ActivatedRoute) {
    this.date = router.snapshot.params['date'];
    this.seq = router.snapshot.params['seq'];
    this.place = router.snapshot.params['place'];
  }

  NowDate : string = '';

  ngOnInit(): void {
    //this.NowDate = new Date().toISOString();
    //this.date = this.NowDate.toString().substring(0,4) + this.NowDate.toString().substring(5,7) + this.NowDate.toString().substring(8,10);

    this.search_food();
    this.search_salad();
  }

  search_food(): void{
    var postData = JSON.stringify({place:this.place, seq: this.seq, date:this.date, db: 'c_food'});

    this.result$ = this.api.post('/api/food/post/search',postData) //
    this.result$.subscribe(console.log) // console 확인
  }

  search_salad(): void{

    this.salad_date = this.date.substring(0,4) + '-' + this.date.substring(4,6) + '-' + this.date.substring(6,8);

    const check_date = new Date('2022-05-20');
    // 샐러드는 목요일만 신청 가능
    if(new Date(check_date.getTime()).getDay() != 1){      
      var temp_date = this.getMonday(new Date(this.salad_date)).toISOString();
      this.salad_date = temp_date.substring(0,4) + temp_date.substring(5,7) + temp_date.substring(8,10);
      //alert(this.salad_date);
    }    

    //alert(str + ' / ' + Warehouse);
    var postData = JSON.stringify({place:this.place, seq: this.seq, date:this.salad_date, db: 'c_salad'});

    this.result_salad$ = this.api.post('/api/food/post/search',postData) //
    this.result_salad$.subscribe(console.log) // console 확인

    this.SUM();
  }

  getMonday(d: Date):Date{
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
  }


  // API에서 받은 인원수 합산 
  SUM(){

    this.result$.subscribe(lists => {
      lists.forEach(contact => {
        if(!isNaN(Number(contact.count))){
          this.total_food +=  Number(contact.count);
          //alert(Number(contact.count));
        }
      })
    })

    this.result_salad$.subscribe(lists => {
      lists.forEach(contact => {
        if(!isNaN(Number(contact.count))){
          this.total_salad +=  Number(contact.count);
        }
      })
    })
  }
}
