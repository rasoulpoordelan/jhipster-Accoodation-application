import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlaceCategoryMySuffix } from 'app/shared/model/place-category-my-suffix.model';
import { AccountService } from 'app/core';
import { PlaceCategoryMySuffixService } from './place-category-my-suffix.service';

@Component({
  selector: 'jhi-place-category-my-suffix',
  templateUrl: './place-category-my-suffix.component.html'
})
export class PlaceCategoryMySuffixComponent implements OnInit, OnDestroy {
  placeCategories: IPlaceCategoryMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected placeCategoryService: PlaceCategoryMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.placeCategoryService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlaceCategoryMySuffix[]>) => res.ok),
        map((res: HttpResponse<IPlaceCategoryMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IPlaceCategoryMySuffix[]) => {
          this.placeCategories = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlaceCategories();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlaceCategoryMySuffix) {
    return item.id;
  }

  registerChangeInPlaceCategories() {
    this.eventSubscriber = this.eventManager.subscribe('placeCategoryListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
