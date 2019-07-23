import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlaceServiceMySuffix } from 'app/shared/model/place-service-my-suffix.model';
import { AccountService } from 'app/core';
import { PlaceServiceMySuffixService } from './place-service-my-suffix.service';

@Component({
  selector: 'jhi-place-service-my-suffix',
  templateUrl: './place-service-my-suffix.component.html'
})
export class PlaceServiceMySuffixComponent implements OnInit, OnDestroy {
  placeServices: IPlaceServiceMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected placeServiceService: PlaceServiceMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.placeServiceService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlaceServiceMySuffix[]>) => res.ok),
        map((res: HttpResponse<IPlaceServiceMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IPlaceServiceMySuffix[]) => {
          this.placeServices = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlaceServices();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlaceServiceMySuffix) {
    return item.id;
  }

  registerChangeInPlaceServices() {
    this.eventSubscriber = this.eventManager.subscribe('placeServiceListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
