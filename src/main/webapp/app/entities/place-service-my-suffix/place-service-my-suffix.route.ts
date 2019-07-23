import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PlaceServiceMySuffix } from 'app/shared/model/place-service-my-suffix.model';
import { PlaceServiceMySuffixService } from './place-service-my-suffix.service';
import { PlaceServiceMySuffixComponent } from './place-service-my-suffix.component';
import { PlaceServiceMySuffixDetailComponent } from './place-service-my-suffix-detail.component';
import { PlaceServiceMySuffixUpdateComponent } from './place-service-my-suffix-update.component';
import { PlaceServiceMySuffixDeletePopupComponent } from './place-service-my-suffix-delete-dialog.component';
import { IPlaceServiceMySuffix } from 'app/shared/model/place-service-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PlaceServiceMySuffixResolve implements Resolve<IPlaceServiceMySuffix> {
  constructor(private service: PlaceServiceMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlaceServiceMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PlaceServiceMySuffix>) => response.ok),
        map((placeService: HttpResponse<PlaceServiceMySuffix>) => placeService.body)
      );
    }
    return of(new PlaceServiceMySuffix());
  }
}

export const placeServiceRoute: Routes = [
  {
    path: '',
    component: PlaceServiceMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceServices'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlaceServiceMySuffixDetailComponent,
    resolve: {
      placeService: PlaceServiceMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceServices'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlaceServiceMySuffixUpdateComponent,
    resolve: {
      placeService: PlaceServiceMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceServices'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlaceServiceMySuffixUpdateComponent,
    resolve: {
      placeService: PlaceServiceMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceServices'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const placeServicePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlaceServiceMySuffixDeletePopupComponent,
    resolve: {
      placeService: PlaceServiceMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceServices'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
