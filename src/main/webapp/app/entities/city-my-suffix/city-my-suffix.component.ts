import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICityMySuffix } from 'app/shared/model/city-my-suffix.model';
import { AccountService } from 'app/core';
import { CityMySuffixService } from './city-my-suffix.service';

@Component({
  selector: 'jhi-city-my-suffix',
  templateUrl: './city-my-suffix.component.html'
})
export class CityMySuffixComponent implements OnInit, OnDestroy {
  cities: ICityMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected cityService: CityMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.cityService
      .query()
      .pipe(
        filter((res: HttpResponse<ICityMySuffix[]>) => res.ok),
        map((res: HttpResponse<ICityMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: ICityMySuffix[]) => {
          this.cities = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCities();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICityMySuffix) {
    return item.id;
  }

  registerChangeInCities() {
    this.eventSubscriber = this.eventManager.subscribe('cityListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
