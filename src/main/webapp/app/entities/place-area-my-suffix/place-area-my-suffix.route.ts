import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PlaceAreaMySuffix } from 'app/shared/model/place-area-my-suffix.model';
import { PlaceAreaMySuffixService } from './place-area-my-suffix.service';
import { PlaceAreaMySuffixComponent } from './place-area-my-suffix.component';
import { PlaceAreaMySuffixDetailComponent } from './place-area-my-suffix-detail.component';
import { PlaceAreaMySuffixUpdateComponent } from './place-area-my-suffix-update.component';
import { PlaceAreaMySuffixDeletePopupComponent } from './place-area-my-suffix-delete-dialog.component';
import { IPlaceAreaMySuffix } from 'app/shared/model/place-area-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PlaceAreaMySuffixResolve implements Resolve<IPlaceAreaMySuffix> {
  constructor(private service: PlaceAreaMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlaceAreaMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PlaceAreaMySuffix>) => response.ok),
        map((placeArea: HttpResponse<PlaceAreaMySuffix>) => placeArea.body)
      );
    }
    return of(new PlaceAreaMySuffix());
  }
}

export const placeAreaRoute: Routes = [
  {
    path: '',
    component: PlaceAreaMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceAreas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlaceAreaMySuffixDetailComponent,
    resolve: {
      placeArea: PlaceAreaMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceAreas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlaceAreaMySuffixUpdateComponent,
    resolve: {
      placeArea: PlaceAreaMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceAreas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlaceAreaMySuffixUpdateComponent,
    resolve: {
      placeArea: PlaceAreaMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceAreas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const placeAreaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlaceAreaMySuffixDeletePopupComponent,
    resolve: {
      placeArea: PlaceAreaMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceAreas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
