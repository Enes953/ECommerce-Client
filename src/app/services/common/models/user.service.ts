import { SocialUser } from '@abacritt/angularx-social-login/public-api';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, observable, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { TokenDto } from 'src/app/contracts/token/tokenDto';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService, private toastrService:CustomToastrService) { }


async create(user:User):Promise<Create_User>{
 const observable:Observable<Create_User|User> = this.httpClientService.post<Create_User|User>({
    controller:"users"
  },user);
 return await firstValueFrom(observable) as Create_User;
}
}
