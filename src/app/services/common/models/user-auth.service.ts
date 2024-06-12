import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenDto } from 'src/app/contracts/token/tokenDto';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService:HttpClientService, private toastrService:CustomToastrService) { }

   async login(userNameOrEmail:string,password:string, callBackFunction?:()=>void):Promise<any>{
    const observable:Observable<any|TokenDto> = this.httpClientService.post<any|TokenDto>({
       controller:"auth",
       action:"login"
     },{userNameOrEmail,password})
   
    const tokenDto:TokenDto = await firstValueFrom(observable) as TokenDto
     if(tokenDto) {
       localStorage.setItem("accessToken",tokenDto.token.accessToken)
       localStorage.setItem("refreshToken",tokenDto.token.refreshToken)
       }
     callBackFunction();
   }
   async refreshTokenLogin(refreshToken:string, callBackFunction?:()=>void):Promise<any>{
    const observable:Observable<any>|TokenDto = this.httpClientService.post({
     action:"refreshTokenLogin",
     controller:"auth" 
    },{refreshToken:refreshToken});

    const tokenDto:TokenDto = await firstValueFrom(observable) as TokenDto
    if(tokenDto){
      localStorage.setItem("accessToken",tokenDto.token.accessToken)
       localStorage.setItem("refreshToken",tokenDto.token.refreshToken)
       this.toastrService.message("Kullanıcı Girişi Başarılı","Başarılı",{
         messageType:ToastrMessageType.Success,
         position:ToastrPosition.TopRight
       })
     }
     callBackFunction();
   }
   async googleLogin(user:SocialUser,callBackFunction?:()=>void):Promise<any>{
    const observable:Observable<SocialUser|TokenDto> = this.httpClientService.post<SocialUser|TokenDto>({
       action:"google-login",
       controller:"auth"
     },user)
    const tokenDto:TokenDto = await firstValueFrom(observable) as TokenDto
    if(tokenDto){
       localStorage.setItem("accessToken",tokenDto.token.accessToken)
       localStorage.setItem("refreshToken",tokenDto.token.refreshToken)
       this.toastrService.message("Google ile Kullanıcı Girişi Başarılı","Başarılı",{
       messageType:ToastrMessageType.Success,
       position:ToastrPosition.TopRight
     })
     }
     callBackFunction();
   }
   async facebookLogin(user:SocialUser,callBackFunction?:()=>void):Promise<any>{
     const observable:Observable<SocialUser|TokenDto> = this.httpClientService.post<SocialUser|TokenDto>({
       action:"facebook-login",
       controller:"auth"
     },user)
     const tokenDto:TokenDto = await firstValueFrom(observable) as TokenDto
     if(tokenDto){
       localStorage.setItem("accessToken",tokenDto.token.accessToken)
       localStorage.setItem("refreshToken",tokenDto.token.refreshToken)
       this.toastrService.message("Facebook ile Kullanıcı Girişi Başarılı","Başarılı",{
       messageType:ToastrMessageType.Success,
       position:ToastrPosition.TopRight
     })
     }
     callBackFunction();
   }
}
