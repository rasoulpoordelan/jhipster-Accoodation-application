import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITagMySuffix } from 'app/shared/model/tag-my-suffix.model';
import { TagMySuffixService } from './tag-my-suffix.service';

@Component({
  selector: 'jhi-tag-my-suffix-delete-dialog',
  templateUrl: './tag-my-suffix-delete-dialog.component.html'
})
export class TagMySuffixDeleteDialogComponent {
  tag: ITagMySuffix;

  constructor(protected tagService: TagMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tagService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tagListModification',
        content: 'Deleted an tag'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tag-my-suffix-delete-popup',
  template: ''
})
export class TagMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tag }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TagMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tag = tag;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tag-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tag-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
