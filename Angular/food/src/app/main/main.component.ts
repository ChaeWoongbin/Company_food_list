import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../service_item/session.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  login_user : string = "";

  closeResult!: string;
  @ViewChild('modal_id') content : any;
  constructor(private modalService: NgbModal, private session : SessionService) {}

  ngAfterViewInit() {
    this.openModal();
  }
  openModal(){
    this.modalService.open(this.content, {size: 'lg'});
  }

  ngOnInit(): void {
    this.login_user = this.session.check_login();
  }

}
