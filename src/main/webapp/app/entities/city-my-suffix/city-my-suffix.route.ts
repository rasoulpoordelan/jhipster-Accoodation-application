import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CityMySuffix } from 'app/shared/model/city-my-suffix.model';
import { CityMySuffixService } from './city-my-suffix.service';
import { CityMySuffixComponent } from './city-my-suffix.component';
import { CityMySuffixDetailComponent } from './city-my-suffix-detail.component';
import { CityMySuffixUpdateComponent } from './city-my-suffix-update.component';
import { CityMySuffixDeletePopupComponent } from './city-my-suffix-delete-dialog.component';
import { ICityMySuffix } from 'app/shared/model/city-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CityMySuffixResolve implements Resolve<ICityMySuffix> {
  constructor(private service: CityMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICityMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CityMySuffix>) => response.ok),
        map((city: HttpResponse<CityMySuffix>) => city.body)
      );
    }
    return of(new CityMySuffix());
  }
}

export const cityRoute: Routes = [
  {
    path: '',
    component: CityMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CityMySuffixDetailComponent,
    resolve: {
      city: CityMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CityMySuffixUpdateComponent,
    resolve: {
      city: CityMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CityMySuffixUpdateComponent,
    resolve: {
      city: CityMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cities'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const cityPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CityMySuffixDeletePopupComponent,
    resolve: {
      city: CityMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cities'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
