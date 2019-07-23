import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderMySuffix } from 'app/shared/model/order-my-suffix.model';
import { OrderMySuffixService } from './order-my-suffix.service';

@Component({
  selector: 'jhi-order-my-suffix-delete-dialog',
  templateUrl: './order-my-suffix-delete-dialog.component.html'
})
export class OrderMySuffixDeleteDialogComponent {
  order: IOrderMySuffix;

  constructor(protected orderService: OrderMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.orderService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'orderListModification',
        content: 'Deleted an order'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-order-my-suffix-delete-popup',
  template: ''
})
export class OrderMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ order }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OrderMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.order = order;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/order-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/order-my-suffix', { outlets: { popup: null } }]);
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
