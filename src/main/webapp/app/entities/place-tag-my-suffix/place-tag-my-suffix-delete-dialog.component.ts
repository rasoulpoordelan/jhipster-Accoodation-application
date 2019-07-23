import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlaceTagMySuffix } from 'app/shared/model/place-tag-my-suffix.model';
import { PlaceTagMySuffixService } from './place-tag-my-suffix.service';

@Component({
  selector: 'jhi-place-tag-my-suffix-delete-dialog',
  templateUrl: './place-tag-my-suffix-delete-dialog.component.html'
})
export class PlaceTagMySuffixDeleteDialogComponent {
  placeTag: IPlaceTagMySuffix;

  constructor(
    protected placeTagService: PlaceTagMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.placeTagService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'placeTagListModification',
        content: 'Deleted an placeTag'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-place-tag-my-suffix-delete-popup',
  template: ''
})
export class PlaceTagMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ placeTag }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlaceTagMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.placeTag = placeTag;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/place-tag-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/place-tag-my-suffix', { outlets: { popup: null } }]);
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
