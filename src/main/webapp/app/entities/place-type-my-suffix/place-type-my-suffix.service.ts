import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlaceTypeMySuffix } from 'app/shared/model/place-type-my-suffix.model';

type EntityResponseType = HttpResponse<IPlaceTypeMySuffix>;
type EntityArrayResponseType = HttpResponse<IPlaceTypeMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PlaceTypeMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/place-types';

  constructor(protected http: HttpClient) {}

  create(placeType: IPlaceTypeMySuffix): Observable<EntityResponseType> {
    return this.http.post<IPlaceTypeMySuffix>(this.resourceUrl, placeType, { observe: 'response' });
  }

  update(placeType: IPlaceTypeMySuffix): Observable<EntityResponseType> {
    return this.http.put<IPlaceTypeMySuffix>(this.resourceUrl, placeType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlaceTypeMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlaceTypeMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
