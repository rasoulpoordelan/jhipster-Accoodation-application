import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrderMySuffix } from 'app/shared/model/order-my-suffix.model';
import { OrderMySuffixService } from './order-my-suffix.service';
import { OrderMySuffixComponent } from './order-my-suffix.component';
import { OrderMySuffixDetailComponent } from './order-my-suffix-detail.component';
import { OrderMySuffixUpdateComponent } from './order-my-suffix-update.component';
import { OrderMySuffixDeletePopupComponent } from './order-my-suffix-delete-dialog.component';
import { IOrderMySuffix } from 'app/shared/model/order-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class OrderMySuffixResolve implements Resolve<IOrderMySuffix> {
  constructor(private service: OrderMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrderMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OrderMySuffix>) => response.ok),
        map((order: HttpResponse<OrderMySuffix>) => order.body)
      );
    }
    return of(new OrderMySuffix());
  }
}

export const orderRoute: Routes = [
  {
    path: '',
    component: OrderMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Orders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrderMySuffixDetailComponent,
    resolve: {
      order: OrderMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Orders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrderMySuffixUpdateComponent,
    resolve: {
      order: OrderMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Orders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrderMySuffixUpdateComponent,
    resolve: {
      order: OrderMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Orders'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const orderPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OrderMySuffixDeletePopupComponent,
    resolve: {
      order: OrderMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Orders'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
