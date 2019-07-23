import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlaceAreaMySuffix } from 'app/shared/model/place-area-my-suffix.model';
import { PlaceAreaMySuffixService } from './place-area-my-suffix.service';

@Component({
  selector: 'jhi-place-area-my-suffix-delete-dialog',
  templateUrl: './place-area-my-suffix-delete-dialog.component.html'
})
export class PlaceAreaMySuffixDeleteDialogComponent {
  placeArea: IPlaceAreaMySuffix;

  constructor(
    protected placeAreaService: PlaceAreaMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.placeAreaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'placeAreaListModification',
        content: 'Deleted an placeArea'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-place-area-my-suffix-delete-popup',
  template: ''
})
export class PlaceAreaMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ placeArea }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlaceAreaMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.placeArea = placeArea;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/place-area-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/place-area-my-suffix', { outlets: { popup: null } }]);
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
