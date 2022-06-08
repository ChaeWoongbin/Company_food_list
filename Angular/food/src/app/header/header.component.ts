import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service_item/session.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  id : string = "";
  show_id : boolean = false;

  constructor(private session : SessionService) { }

  ngOnInit(): void {
  
  }

  ngDoCheck(): void {
    this.session.getInfo();
    this.id = this.session.check_login();
    this.show_id = true;
  }

  log_out(){
    this.id = "";
  }

}
