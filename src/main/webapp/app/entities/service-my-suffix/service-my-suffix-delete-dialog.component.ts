import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServiceMySuffix } from 'app/shared/model/service-my-suffix.model';
import { ServiceMySuffixService } from './service-my-suffix.service';

@Component({
  selector: 'jhi-service-my-suffix-delete-dialog',
  templateUrl: './service-my-suffix-delete-dialog.component.html'
})
export class ServiceMySuffixDeleteDialogComponent {
  service: IServiceMySuffix;

  constructor(
    protected serviceService: ServiceMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.serviceService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'serviceListModification',
        content: 'Deleted an service'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-service-my-suffix-delete-popup',
  template: ''
})
export class ServiceMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ service }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ServiceMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.service = service;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/service-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/service-my-suffix', { outlets: { popup: null } }]);
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
