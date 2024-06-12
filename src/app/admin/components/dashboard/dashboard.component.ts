import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alertify:AlertifyService,spinner:NgxSpinnerService,private signalRService:SignalRService) { 
    super(spinner)
    signalRService.start(HubUrls.ProductHub)  //backenddeki hub registrationdan geliyor.
  }

  ngOnInit(): void {        //backenddeki message yazık.
    this.signalRService.on(ReceiveFunctions.ProductAddedMessagecReceiveFunction,message=>{
     this.alertify.message(message,{
       messageType:MessageType.Notify,
       position:Position.TopLeft
     })
    })  
  }
  m(){
    this.alertify.message("Merhaba",{
      messageType:MessageType.Success,
      position:Position.TopCenter,
      delay:5,
      dismissOthers:true

    })
  }
  d(){
    this.alertify.dismiss()
  }
}
