import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlaceTypeMySuffix } from 'app/shared/model/place-type-my-suffix.model';
import { PlaceTypeMySuffixService } from './place-type-my-suffix.service';

@Component({
  selector: 'jhi-place-type-my-suffix-delete-dialog',
  templateUrl: './place-type-my-suffix-delete-dialog.component.html'
})
export class PlaceTypeMySuffixDeleteDialogComponent {
  placeType: IPlaceTypeMySuffix;

  constructor(
    protected placeTypeService: PlaceTypeMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.placeTypeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'placeTypeListModification',
        content: 'Deleted an placeType'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-place-type-my-suffix-delete-popup',
  template: ''
})
export class PlaceTypeMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ placeType }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlaceTypeMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.placeType = placeType;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/place-type-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/place-type-my-suffix', { outlets: { popup: null } }]);
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
