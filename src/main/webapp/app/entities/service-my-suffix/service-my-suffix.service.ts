import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IServiceMySuffix } from 'app/shared/model/service-my-suffix.model';

type EntityResponseType = HttpResponse<IServiceMySuffix>;
type EntityArrayResponseType = HttpResponse<IServiceMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ServiceMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/services';

  constructor(protected http: HttpClient) {}

  create(service: IServiceMySuffix): Observable<EntityResponseType> {
    return this.http.post<IServiceMySuffix>(this.resourceUrl, service, { observe: 'response' });
  }

  update(service: IServiceMySuffix): Observable<EntityResponseType> {
    return this.http.put<IServiceMySuffix>(this.resourceUrl, service, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IServiceMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IServiceMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
