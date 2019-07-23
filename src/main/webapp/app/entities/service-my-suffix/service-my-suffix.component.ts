import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IServiceMySuffix } from 'app/shared/model/service-my-suffix.model';
import { AccountService } from 'app/core';
import { ServiceMySuffixService } from './service-my-suffix.service';

@Component({
  selector: 'jhi-service-my-suffix',
  templateUrl: './service-my-suffix.component.html'
})
export class ServiceMySuffixComponent implements OnInit, OnDestroy {
  services: IServiceMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected serviceService: ServiceMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.serviceService
      .query()
      .pipe(
        filter((res: HttpResponse<IServiceMySuffix[]>) => res.ok),
        map((res: HttpResponse<IServiceMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IServiceMySuffix[]) => {
          this.services = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInServices();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IServiceMySuffix) {
    return item.id;
  }

  registerChangeInServices() {
    this.eventSubscriber = this.eventManager.subscribe('serviceListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
