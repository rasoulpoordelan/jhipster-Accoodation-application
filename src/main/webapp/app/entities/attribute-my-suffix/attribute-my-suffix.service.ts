import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAttributeMySuffix } from 'app/shared/model/attribute-my-suffix.model';

type EntityResponseType = HttpResponse<IAttributeMySuffix>;
type EntityArrayResponseType = HttpResponse<IAttributeMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class AttributeMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/attributes';

  constructor(protected http: HttpClient) {}

  create(attribute: IAttributeMySuffix): Observable<EntityResponseType> {
    return this.http.post<IAttributeMySuffix>(this.resourceUrl, attribute, { observe: 'response' });
  }

  update(attribute: IAttributeMySuffix): Observable<EntityResponseType> {
    return this.http.put<IAttributeMySuffix>(this.resourceUrl, attribute, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAttributeMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAttributeMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
