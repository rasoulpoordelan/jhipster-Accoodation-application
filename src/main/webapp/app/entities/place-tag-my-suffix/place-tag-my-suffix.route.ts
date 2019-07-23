import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PlaceTagMySuffix } from 'app/shared/model/place-tag-my-suffix.model';
import { PlaceTagMySuffixService } from './place-tag-my-suffix.service';
import { PlaceTagMySuffixComponent } from './place-tag-my-suffix.component';
import { PlaceTagMySuffixDetailComponent } from './place-tag-my-suffix-detail.component';
import { PlaceTagMySuffixUpdateComponent } from './place-tag-my-suffix-update.component';
import { PlaceTagMySuffixDeletePopupComponent } from './place-tag-my-suffix-delete-dialog.component';
import { IPlaceTagMySuffix } from 'app/shared/model/place-tag-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PlaceTagMySuffixResolve implements Resolve<IPlaceTagMySuffix> {
  constructor(private service: PlaceTagMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlaceTagMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PlaceTagMySuffix>) => response.ok),
        map((placeTag: HttpResponse<PlaceTagMySuffix>) => placeTag.body)
      );
    }
    return of(new PlaceTagMySuffix());
  }
}

export const placeTagRoute: Routes = [
  {
    path: '',
    component: PlaceTagMySuffixComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'PlaceTags'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlaceTagMySuffixDetailComponent,
    resolve: {
      placeTag: PlaceTagMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceTags'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlaceTagMySuffixUpdateComponent,
    resolve: {
      placeTag: PlaceTagMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceTags'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlaceTagMySuffixUpdateComponent,
    resolve: {
      placeTag: PlaceTagMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceTags'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const placeTagPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlaceTagMySuffixDeletePopupComponent,
    resolve: {
      placeTag: PlaceTagMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceTags'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
