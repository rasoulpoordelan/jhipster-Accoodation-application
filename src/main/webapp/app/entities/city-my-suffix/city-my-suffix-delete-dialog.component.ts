import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICityMySuffix } from 'app/shared/model/city-my-suffix.model';
import { CityMySuffixService } from './city-my-suffix.service';

@Component({
  selector: 'jhi-city-my-suffix-delete-dialog',
  templateUrl: './city-my-suffix-delete-dialog.component.html'
})
export class CityMySuffixDeleteDialogComponent {
  city: ICityMySuffix;

  constructor(protected cityService: CityMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cityService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'cityListModification',
        content: 'Deleted an city'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-city-my-suffix-delete-popup',
  template: ''
})
export class CityMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ city }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CityMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.city = city;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/city-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/city-my-suffix', { outlets: { popup: null } }]);
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
