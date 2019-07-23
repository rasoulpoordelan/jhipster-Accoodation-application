import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AttributeMySuffix } from 'app/shared/model/attribute-my-suffix.model';
import { AttributeMySuffixService } from './attribute-my-suffix.service';
import { AttributeMySuffixComponent } from './attribute-my-suffix.component';
import { AttributeMySuffixDetailComponent } from './attribute-my-suffix-detail.component';
import { AttributeMySuffixUpdateComponent } from './attribute-my-suffix-update.component';
import { AttributeMySuffixDeletePopupComponent } from './attribute-my-suffix-delete-dialog.component';
import { IAttributeMySuffix } from 'app/shared/model/attribute-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class AttributeMySuffixResolve implements Resolve<IAttributeMySuffix> {
  constructor(private service: AttributeMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAttributeMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AttributeMySuffix>) => response.ok),
        map((attribute: HttpResponse<AttributeMySuffix>) => attribute.body)
      );
    }
    return of(new AttributeMySuffix());
  }
}

export const attributeRoute: Routes = [
  {
    path: '',
    component: AttributeMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Attributes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AttributeMySuffixDetailComponent,
    resolve: {
      attribute: AttributeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Attributes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AttributeMySuffixUpdateComponent,
    resolve: {
      attribute: AttributeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Attributes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AttributeMySuffixUpdateComponent,
    resolve: {
      attribute: AttributeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Attributes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const attributePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AttributeMySuffixDeletePopupComponent,
    resolve: {
      attribute: AttributeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Attributes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
