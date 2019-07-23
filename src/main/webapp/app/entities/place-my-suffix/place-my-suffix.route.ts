import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PlaceMySuffix } from 'app/shared/model/place-my-suffix.model';
import { PlaceMySuffixService } from './place-my-suffix.service';
import { PlaceMySuffixComponent } from './place-my-suffix.component';
import { PlaceMySuffixDetailComponent } from './place-my-suffix-detail.component';
import { PlaceMySuffixUpdateComponent } from './place-my-suffix-update.component';
import { PlaceMySuffixDeletePopupComponent } from './place-my-suffix-delete-dialog.component';
import { IPlaceMySuffix } from 'app/shared/model/place-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PlaceMySuffixResolve implements Resolve<IPlaceMySuffix> {
  constructor(private service: PlaceMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlaceMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PlaceMySuffix>) => response.ok),
        map((place: HttpResponse<PlaceMySuffix>) => place.body)
      );
    }
    return of(new PlaceMySuffix());
  }
}

export const placeRoute: Routes = [
  {
    path: '',
    component: PlaceMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Places'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlaceMySuffixDetailComponent,
    resolve: {
      place: PlaceMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Places'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlaceMySuffixUpdateComponent,
    resolve: {
      place: PlaceMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Places'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlaceMySuffixUpdateComponent,
    resolve: {
      place: PlaceMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Places'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const placePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlaceMySuffixDeletePopupComponent,
    resolve: {
      place: PlaceMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Places'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
