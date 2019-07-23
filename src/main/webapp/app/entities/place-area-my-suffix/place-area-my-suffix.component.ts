import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlaceAreaMySuffix } from 'app/shared/model/place-area-my-suffix.model';
import { AccountService } from 'app/core';
import { PlaceAreaMySuffixService } from './place-area-my-suffix.service';

@Component({
  selector: 'jhi-place-area-my-suffix',
  templateUrl: './place-area-my-suffix.component.html'
})
export class PlaceAreaMySuffixComponent implements OnInit, OnDestroy {
  placeAreas: IPlaceAreaMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected placeAreaService: PlaceAreaMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.placeAreaService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlaceAreaMySuffix[]>) => res.ok),
        map((res: HttpResponse<IPlaceAreaMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IPlaceAreaMySuffix[]) => {
          this.placeAreas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlaceAreas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlaceAreaMySuffix) {
    return item.id;
  }

  registerChangeInPlaceAreas() {
    this.eventSubscriber = this.eventManager.subscribe('placeAreaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
