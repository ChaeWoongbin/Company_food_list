import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service_item/session.service';

@Component({
  selector: 'app-log-out-component',
  templateUrl: './log-out-component.component.html',
  styleUrls: ['./log-out-component.component.css']
})
export class LogOutComponentComponent implements OnInit {

  constructor(private session : SessionService) { }

  ngOnInit(): void {
    this.session.logOut();
    alert("로그아웃 되었습니다 !!!");
  }

}
