import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderMySuffix } from 'app/shared/model/order-my-suffix.model';
import { AccountService } from 'app/core';
import { OrderMySuffixService } from './order-my-suffix.service';

@Component({
  selector: 'jhi-order-my-suffix',
  templateUrl: './order-my-suffix.component.html'
})
export class OrderMySuffixComponent implements OnInit, OnDestroy {
  orders: IOrderMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected orderService: OrderMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.orderService
      .query()
      .pipe(
        filter((res: HttpResponse<IOrderMySuffix[]>) => res.ok),
        map((res: HttpResponse<IOrderMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IOrderMySuffix[]) => {
          this.orders = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOrders();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrderMySuffix) {
    return item.id;
  }

  registerChangeInOrders() {
    this.eventSubscriber = this.eventManager.subscribe('orderListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
