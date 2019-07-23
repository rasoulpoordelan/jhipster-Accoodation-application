import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlaceCategoryMySuffix } from 'app/shared/model/place-category-my-suffix.model';

type EntityResponseType = HttpResponse<IPlaceCategoryMySuffix>;
type EntityArrayResponseType = HttpResponse<IPlaceCategoryMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PlaceCategoryMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/place-categories';

  constructor(protected http: HttpClient) {}

  create(placeCategory: IPlaceCategoryMySuffix): Observable<EntityResponseType> {
    return this.http.post<IPlaceCategoryMySuffix>(this.resourceUrl, placeCategory, { observe: 'response' });
  }

  update(placeCategory: IPlaceCategoryMySuffix): Observable<EntityResponseType> {
    return this.http.put<IPlaceCategoryMySuffix>(this.resourceUrl, placeCategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlaceCategoryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlaceCategoryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
