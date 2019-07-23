import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITagMySuffix } from 'app/shared/model/tag-my-suffix.model';
import { AccountService } from 'app/core';
import { TagMySuffixService } from './tag-my-suffix.service';

@Component({
  selector: 'jhi-tag-my-suffix',
  templateUrl: './tag-my-suffix.component.html'
})
export class TagMySuffixComponent implements OnInit, OnDestroy {
  tags: ITagMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tagService: TagMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tagService
      .query()
      .pipe(
        filter((res: HttpResponse<ITagMySuffix[]>) => res.ok),
        map((res: HttpResponse<ITagMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: ITagMySuffix[]) => {
          this.tags = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTags();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITagMySuffix) {
    return item.id;
  }

  registerChangeInTags() {
    this.eventSubscriber = this.eventManager.subscribe('tagListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
