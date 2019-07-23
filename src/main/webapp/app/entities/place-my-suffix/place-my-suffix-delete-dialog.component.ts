import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlaceMySuffix } from 'app/shared/model/place-my-suffix.model';
import { PlaceMySuffixService } from './place-my-suffix.service';

@Component({
  selector: 'jhi-place-my-suffix-delete-dialog',
  templateUrl: './place-my-suffix-delete-dialog.component.html'
})
export class PlaceMySuffixDeleteDialogComponent {
  place: IPlaceMySuffix;

  constructor(protected placeService: PlaceMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.placeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'placeListModification',
        content: 'Deleted an place'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-place-my-suffix-delete-popup',
  template: ''
})
export class PlaceMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ place }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlaceMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.place = place;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/place-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/place-my-suffix', { outlets: { popup: null } }]);
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
