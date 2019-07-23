import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ServiceMySuffix } from 'app/shared/model/service-my-suffix.model';
import { ServiceMySuffixService } from './service-my-suffix.service';
import { ServiceMySuffixComponent } from './service-my-suffix.component';
import { ServiceMySuffixDetailComponent } from './service-my-suffix-detail.component';
import { ServiceMySuffixUpdateComponent } from './service-my-suffix-update.component';
import { ServiceMySuffixDeletePopupComponent } from './service-my-suffix-delete-dialog.component';
import { IServiceMySuffix } from 'app/shared/model/service-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ServiceMySuffixResolve implements Resolve<IServiceMySuffix> {
  constructor(private service: ServiceMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IServiceMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ServiceMySuffix>) => response.ok),
        map((service: HttpResponse<ServiceMySuffix>) => service.body)
      );
    }
    return of(new ServiceMySuffix());
  }
}

export const serviceRoute: Routes = [
  {
    path: '',
    component: ServiceMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Services'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ServiceMySuffixDetailComponent,
    resolve: {
      service: ServiceMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Services'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ServiceMySuffixUpdateComponent,
    resolve: {
      service: ServiceMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Services'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ServiceMySuffixUpdateComponent,
    resolve: {
      service: ServiceMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Services'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const servicePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ServiceMySuffixDeletePopupComponent,
    resolve: {
      service: ServiceMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Services'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
