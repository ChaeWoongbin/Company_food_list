import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import {NgbDatepicker, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  input_date!: NgbDateStruct;

  search_dt : string = '';
  place : string ='';
  seq : string = '';

  constructor(private api: ServiceService, private router: Router) {
   
  }


  ngOnInit(): void {
  }

  
  btn_search(sel_date : NgbDateStruct , seq : string, place: string): void{

    
   // var input_date_value = this.NowDate.toString().substring(0,4) + this.NowDate.toString().substring(5,7) + this.NowDate.toString().substring(8,10);

   var pad = "0"; // 날짜 자리수 맞추기
   var set_month = (pad + sel_date.month.toString()).substring((pad.length + sel_date.month.toString()).length-2 ,(pad.length + sel_date.month.toString()).length);
   var set_day = (pad + sel_date.day.toString()).substring((pad.length + sel_date.day.toString()).length-2 ,(pad.length + sel_date.day.toString()).length)
   //var set_day = pad + sel_date.day.toString().substr(0,3);


   var input_date_value = sel_date.year.toString() + set_month + set_day;


    //alert(input_date_value + '/' + seq +'/' + place);    
    this.router.navigate(['/search_result/'+input_date_value+'/'+place+'/'+seq]);
  }
  
}
