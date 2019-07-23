import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlaceTypeMySuffix } from 'app/shared/model/place-type-my-suffix.model';
import { AccountService } from 'app/core';
import { PlaceTypeMySuffixService } from './place-type-my-suffix.service';

@Component({
  selector: 'jhi-place-type-my-suffix',
  templateUrl: './place-type-my-suffix.component.html'
})
export class PlaceTypeMySuffixComponent implements OnInit, OnDestroy {
  placeTypes: IPlaceTypeMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected placeTypeService: PlaceTypeMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.placeTypeService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlaceTypeMySuffix[]>) => res.ok),
        map((res: HttpResponse<IPlaceTypeMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IPlaceTypeMySuffix[]) => {
          this.placeTypes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlaceTypes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlaceTypeMySuffix) {
    return item.id;
  }

  registerChangeInPlaceTypes() {
    this.eventSubscriber = this.eventManager.subscribe('placeTypeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
