import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TagMySuffix } from 'app/shared/model/tag-my-suffix.model';
import { TagMySuffixService } from './tag-my-suffix.service';
import { TagMySuffixComponent } from './tag-my-suffix.component';
import { TagMySuffixDetailComponent } from './tag-my-suffix-detail.component';
import { TagMySuffixUpdateComponent } from './tag-my-suffix-update.component';
import { TagMySuffixDeletePopupComponent } from './tag-my-suffix-delete-dialog.component';
import { ITagMySuffix } from 'app/shared/model/tag-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TagMySuffixResolve implements Resolve<ITagMySuffix> {
  constructor(private service: TagMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITagMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TagMySuffix>) => response.ok),
        map((tag: HttpResponse<TagMySuffix>) => tag.body)
      );
    }
    return of(new TagMySuffix());
  }
}

export const tagRoute: Routes = [
  {
    path: '',
    component: TagMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tags'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TagMySuffixDetailComponent,
    resolve: {
      tag: TagMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tags'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TagMySuffixUpdateComponent,
    resolve: {
      tag: TagMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tags'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TagMySuffixUpdateComponent,
    resolve: {
      tag: TagMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tags'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tagPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TagMySuffixDeletePopupComponent,
    resolve: {
      tag: TagMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tags'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
