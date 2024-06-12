import { Injectable } from '@angular/core';
declare var alertify: any

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  // message(message:string, messageType: MessageType,position: Position,delay: number = 3,dismissOthers:Boolean=false)
  message(message:string, options:Partial<AlertifyOptions>)
  {
    const msj =alertify[options.messageType](message);
    alertify.set('notifier','position',options.position);
    alertify.set('notifier','delay',options.delay);
    if(options.dismissOthers)
    msj.dismissOthers();
  }

  dismiss(){
    alertify.dismissAll();
  }
  dismissOthers(){
    alertify.message('Sample').dismissOthers(); 
  }
}
export class AlertifyOptions{
  messageType:MessageType=MessageType.Message;
  position:Position=Position.BottomLeft;
  delay:number=3;
  dismissOthers:boolean=false;

}

export enum MessageType{
  Error = "error",
  Message = "message",
  Success = "success",
  Notify  = "notify",
  Warning = "warning"
}

export enum Position{
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center"
}