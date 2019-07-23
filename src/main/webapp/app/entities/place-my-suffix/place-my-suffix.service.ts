import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlaceMySuffix } from 'app/shared/model/place-my-suffix.model';

type EntityResponseType = HttpResponse<IPlaceMySuffix>;
type EntityArrayResponseType = HttpResponse<IPlaceMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PlaceMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/places';

  constructor(protected http: HttpClient) {}

  create(place: IPlaceMySuffix): Observable<EntityResponseType> {
    return this.http.post<IPlaceMySuffix>(this.resourceUrl, place, { observe: 'response' });
  }

  update(place: IPlaceMySuffix): Observable<EntityResponseType> {
    return this.http.put<IPlaceMySuffix>(this.resourceUrl, place, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlaceMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlaceMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
