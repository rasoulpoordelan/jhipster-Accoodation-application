import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PlaceCategoryMySuffix } from 'app/shared/model/place-category-my-suffix.model';
import { PlaceCategoryMySuffixService } from './place-category-my-suffix.service';
import { PlaceCategoryMySuffixComponent } from './place-category-my-suffix.component';
import { PlaceCategoryMySuffixDetailComponent } from './place-category-my-suffix-detail.component';
import { PlaceCategoryMySuffixUpdateComponent } from './place-category-my-suffix-update.component';
import { PlaceCategoryMySuffixDeletePopupComponent } from './place-category-my-suffix-delete-dialog.component';
import { IPlaceCategoryMySuffix } from 'app/shared/model/place-category-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PlaceCategoryMySuffixResolve implements Resolve<IPlaceCategoryMySuffix> {
  constructor(private service: PlaceCategoryMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlaceCategoryMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PlaceCategoryMySuffix>) => response.ok),
        map((placeCategory: HttpResponse<PlaceCategoryMySuffix>) => placeCategory.body)
      );
    }
    return of(new PlaceCategoryMySuffix());
  }
}

export const placeCategoryRoute: Routes = [
  {
    path: '',
    component: PlaceCategoryMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceCategories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlaceCategoryMySuffixDetailComponent,
    resolve: {
      placeCategory: PlaceCategoryMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceCategories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlaceCategoryMySuffixUpdateComponent,
    resolve: {
      placeCategory: PlaceCategoryMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceCategories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlaceCategoryMySuffixUpdateComponent,
    resolve: {
      placeCategory: PlaceCategoryMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceCategories'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const placeCategoryPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlaceCategoryMySuffixDeletePopupComponent,
    resolve: {
      placeCategory: PlaceCategoryMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlaceCategories'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
