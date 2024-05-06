import { Injectable, inject } from '@angular/core';
import { AddNewAdminRequest } from '../models/add-new-admin-request.model';
import { ApiResponse } from '@core/ai/http.service';
import { EntityIds } from '@core/general/models/entity-ids.model';
import { EntityId } from '@core/general/models/entity-id.model';
import { GetAdminListRequest } from '../models/get-admin-list-request.model';
import { ApiBaseService } from '@core/general/services/api-base.service';
import { GetAdminListReponse } from '../models/get-admin-list-reponse.model';

@Injectable({
  providedIn: 'root'
})
export class AdminManagmentApiService {

  private readonly http = inject(ApiBaseService);

  private addressBase: string = '/AdminManagment';
  public listUrl: string = this.addressBase + '/ListAdmin';

  insertAdmin(request: AddNewAdminRequest) {
    return this.http.post<ApiResponse<object>>('/AdminManagment/InsertAdmin', request);
  }

  removeAdmin(request: EntityIds) {
    return this.http.post<ApiResponse<object>>('/AdminManagment/RemoveAdmin', request);
  }

  deactiveAdmin(request: EntityId) {
    return this.http.post<ApiResponse<object>>('/AdminManagment/DeactiveAdmin', request);
  }

  ListAdmin(request: GetAdminListRequest){
    return this.http.post<ApiResponse<GetAdminListReponse[]>>('/AdminManagment/ListAdmin', request);
  }

}
