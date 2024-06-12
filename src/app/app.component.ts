import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';

declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private toastrService:CustomToastrService,public authService:AuthService,private router:Router){
    authService.identityCheck();
    toastrService.message("Enes Duman","Hoş geldiniz",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopLeft
    })
  }
  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""])
     this.toastrService.message("Oturum Kapatıldı","Uyarı",{
      messageType:ToastrMessageType.Warning,
      position:ToastrPosition.TopRight
     })
  }
}