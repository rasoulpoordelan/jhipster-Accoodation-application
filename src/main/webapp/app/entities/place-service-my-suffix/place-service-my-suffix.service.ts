import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlaceServiceMySuffix } from 'app/shared/model/place-service-my-suffix.model';

type EntityResponseType = HttpResponse<IPlaceServiceMySuffix>;
type EntityArrayResponseType = HttpResponse<IPlaceServiceMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PlaceServiceMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/place-services';

  constructor(protected http: HttpClient) {}

  create(placeService: IPlaceServiceMySuffix): Observable<EntityResponseType> {
    return this.http.post<IPlaceServiceMySuffix>(this.resourceUrl, placeService, { observe: 'response' });
  }

  update(placeService: IPlaceServiceMySuffix): Observable<EntityResponseType> {
    return this.http.put<IPlaceServiceMySuffix>(this.resourceUrl, placeService, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlaceServiceMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlaceServiceMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
