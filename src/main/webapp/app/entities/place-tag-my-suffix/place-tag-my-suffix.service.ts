import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlaceTagMySuffix } from 'app/shared/model/place-tag-my-suffix.model';

type EntityResponseType = HttpResponse<IPlaceTagMySuffix>;
type EntityArrayResponseType = HttpResponse<IPlaceTagMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PlaceTagMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/place-tags';

  constructor(protected http: HttpClient) {}

  create(placeTag: IPlaceTagMySuffix): Observable<EntityResponseType> {
    return this.http.post<IPlaceTagMySuffix>(this.resourceUrl, placeTag, { observe: 'response' });
  }

  update(placeTag: IPlaceTagMySuffix): Observable<EntityResponseType> {
    return this.http.put<IPlaceTagMySuffix>(this.resourceUrl, placeTag, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlaceTagMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlaceTagMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
