import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
import { SessionService } from './service_item/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'food';
  constructor(private bnIdle: BnNgIdleService, private router:Router, private session:SessionService) { // initiate it in your component constructor
    this.bnIdle.startWatching(600).subscribe((res) => { // 10분동안 동작 없을떄 로그아웃
      console.log('세션 유휴 확인');
      if(res && this.session.check_login().length > 1) {
          this.router.navigate(['/logOut']);
          alert('일정시간 동안 동작이 없어 자동으로 로그아웃 됩니다.');
      }
    })
  }
}
