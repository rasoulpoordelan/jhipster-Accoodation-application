import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlaceCategoryMySuffix } from 'app/shared/model/place-category-my-suffix.model';
import { PlaceCategoryMySuffixService } from './place-category-my-suffix.service';

@Component({
  selector: 'jhi-place-category-my-suffix-delete-dialog',
  templateUrl: './place-category-my-suffix-delete-dialog.component.html'
})
export class PlaceCategoryMySuffixDeleteDialogComponent {
  placeCategory: IPlaceCategoryMySuffix;

  constructor(
    protected placeCategoryService: PlaceCategoryMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.placeCategoryService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'placeCategoryListModification',
        content: 'Deleted an placeCategory'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-place-category-my-suffix-delete-popup',
  template: ''
})
export class PlaceCategoryMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ placeCategory }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlaceCategoryMySuffixDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.placeCategory = placeCategory;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/place-category-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/place-category-my-suffix', { outlets: { popup: null } }]);
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
