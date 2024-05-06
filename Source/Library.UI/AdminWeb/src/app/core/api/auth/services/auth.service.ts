import { Injectable, inject } from '@angular/core';
import { ApiBaseService } from '@core/general/services/api-base.service';
import { LoginRequest } from '../models/login-request.model';
import { ApiResponse } from '@core/general/models/api-response.model';
import { AccessTokenModel } from '../models/access-token-model.model';
import { RegisterRequest } from '../models/register-request.model';
import { RefreshTokenRequest } from '../models/refresh-token-request.model';
import { GetUserDataResponse } from '../models/get-user-data-response.model';
import { Menu } from '@core/bootstrap/menu.service';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(ApiBaseService);


  login(request: LoginRequest) {
    return this.http.post<ApiResponse<AccessTokenModel>>('/auth/login', request);
  }

  logout() {
    return this.http.post<ApiResponse>('/auth/logout', {});
  }

  register(request: RegisterRequest) {
    return this.http.post<ApiResponse<AccessTokenModel>>('/auth/register', request);
  }

  refreshToken(request: RefreshTokenRequest){
    return this.http.post<ApiResponse<AccessTokenModel>>('/auth/refreshToken', request);
  }

  getUserData(){
    return this.http.post<ApiResponse<GetUserDataResponse>>('/Auth/GetUserData', {});
  }

  getMenu(isLoadForAdmin: boolean = false){
    if(isLoadForAdmin){
      return this.http
      .get<{ menu: Menu[] }>('./assets/data/menu_admin.json?_t=' + Date.now())
      .pipe(map(res => res.menu));
    }else{
      return this.http
      .get<{ menu: Menu[] }>('./assets/data/menu_user.json?_t=' + Date.now())
      .pipe(map(res => res.menu));
    }

  }

}
