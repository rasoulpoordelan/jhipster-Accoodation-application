import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAttributeMySuffix } from 'app/shared/model/attribute-my-suffix.model';
import { AccountService } from 'app/core';
import { AttributeMySuffixService } from './attribute-my-suffix.service';

@Component({
  selector: 'jhi-attribute-my-suffix',
  templateUrl: './attribute-my-suffix.component.html'
})
export class AttributeMySuffixComponent implements OnInit, OnDestroy {
  attributes: IAttributeMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected attributeService: AttributeMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.attributeService
      .query()
      .pipe(
        filter((res: HttpResponse<IAttributeMySuffix[]>) => res.ok),
        map((res: HttpResponse<IAttributeMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IAttributeMySuffix[]) => {
          this.attributes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAttributes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAttributeMySuffix) {
    return item.id;
  }

  registerChangeInAttributes() {
    this.eventSubscriber = this.eventManager.subscribe('attributeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
