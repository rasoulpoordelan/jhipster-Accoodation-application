import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PlaceTypeMySuffix } from 'app/shared/model/place-type-my-suffix.model';
import { PlaceTypeMySuffixService } from './place-type-my-suffix.service';
import { PlaceTypeMySuffixComponent } from './place-type-my-suffix.component';
import { PlaceTypeMySuffixDetailComponent } from './place-type-my-suffix-detail.component';
import { PlaceTypeMySuffixUpdateComponent } from './place-type-my-suffix-update.component';
import { PlaceTypeMySuffixDeletePopupComponent } from './place-type-my-suffix-delete-dialog.component';
import { IPlaceTypeMySuffix } from 'app/shared/model/place-type-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PlaceTypeMySuffixResolve implements Resolve<IPlaceTypeMySuffix> {
  constructor(private service: PlaceTypeMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlaceTypeMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PlaceTypeMySuffix>) => response.ok),
        map((placeType: HttpResponse<PlaceTypeMySuffix>) => placeType.body)
      );
    }
    return of(new PlaceTypeMySuffix());
  }
}

export const placeTypeRoute: Routes = [
  {
    path: '',
    component: PlaceTypeMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlaceTypeMySuffixDetailComponent,
    resolve: {
      placeType: PlaceTypeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlaceTypeMySuffixUpdateComponent,
    resolve: {
      placeType: PlaceTypeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlaceTypeMySuffixUpdateComponent,
    resolve: {
      placeType: PlaceTypeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceTypes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const placeTypePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlaceTypeMySuffixDeletePopupComponent,
    resolve: {
      placeType: PlaceTypeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceTypes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
