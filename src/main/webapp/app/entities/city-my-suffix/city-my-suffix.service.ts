import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICityMySuffix } from 'app/shared/model/city-my-suffix.model';

type EntityResponseType = HttpResponse<ICityMySuffix>;
type EntityArrayResponseType = HttpResponse<ICityMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CityMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/cities';

  constructor(protected http: HttpClient) {}

  create(city: ICityMySuffix): Observable<EntityResponseType> {
    return this.http.post<ICityMySuffix>(this.resourceUrl, city, { observe: 'response' });
  }

  update(city: ICityMySuffix): Observable<EntityResponseType> {
    return this.http.put<ICityMySuffix>(this.resourceUrl, city, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICityMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICityMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
