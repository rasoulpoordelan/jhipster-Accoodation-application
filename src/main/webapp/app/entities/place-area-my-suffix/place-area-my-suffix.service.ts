import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlaceAreaMySuffix } from 'app/shared/model/place-area-my-suffix.model';

type EntityResponseType = HttpResponse<IPlaceAreaMySuffix>;
type EntityArrayResponseType = HttpResponse<IPlaceAreaMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PlaceAreaMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/place-areas';

  constructor(protected http: HttpClient) {}

  create(placeArea: IPlaceAreaMySuffix): Observable<EntityResponseType> {
    return this.http.post<IPlaceAreaMySuffix>(this.resourceUrl, placeArea, { observe: 'response' });
  }

  update(placeArea: IPlaceAreaMySuffix): Observable<EntityResponseType> {
    return this.http.put<IPlaceAreaMySuffix>(this.resourceUrl, placeArea, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlaceAreaMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlaceAreaMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
