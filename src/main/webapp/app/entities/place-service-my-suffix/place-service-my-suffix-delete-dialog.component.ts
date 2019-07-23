import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlaceServiceMySuffix } from 'app/shared/model/place-service-my-suffix.model';
import { PlaceServiceMySuffixService } from './place-service-my-suffix.service';

@Component({
  selector: 'jhi-place-service-my-suffix-delete-dialog',
  templateUrl: './place-service-my-suffix-delete-dialog.component.html'
})
export class PlaceServiceMySuffixDeleteDialogComponent {
  placeService: IPlaceServiceMySuffix;

  constructor(
    protected placeServiceService: PlaceServiceMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.placeServiceService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'placeServiceListModification',
        content: 'Deleted an placeService'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-place-service-my-suffix-delete-popup',
  template: ''
})
export class PlaceServiceMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ placeService }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlaceServiceMySuffixDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.placeService = placeService;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/place-service-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/place-service-my-suffix', { outlets: { popup: null } }]);
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
