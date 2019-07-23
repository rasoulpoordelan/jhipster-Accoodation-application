import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAttributeMySuffix } from 'app/shared/model/attribute-my-suffix.model';
import { AttributeMySuffixService } from './attribute-my-suffix.service';

@Component({
  selector: 'jhi-attribute-my-suffix-delete-dialog',
  templateUrl: './attribute-my-suffix-delete-dialog.component.html'
})
export class AttributeMySuffixDeleteDialogComponent {
  attribute: IAttributeMySuffix;

  constructor(
    protected attributeService: AttributeMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.attributeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'attributeListModification',
        content: 'Deleted an attribute'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-attribute-my-suffix-delete-popup',
  template: ''
})
export class AttributeMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ attribute }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AttributeMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.attribute = attribute;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/attribute-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/attribute-my-suffix', { outlets: { popup: null } }]);
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
