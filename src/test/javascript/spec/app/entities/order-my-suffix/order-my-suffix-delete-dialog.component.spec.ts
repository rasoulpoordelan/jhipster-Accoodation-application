/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { OrderMySuffixDeleteDialogComponent } from 'app/entities/order-my-suffix/order-my-suffix-delete-dialog.component';
import { OrderMySuffixService } from 'app/entities/order-my-suffix/order-my-suffix.service';

describe('Component Tests', () => {
  describe('OrderMySuffix Management Delete Component', () => {
    let comp: OrderMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<OrderMySuffixDeleteDialogComponent>;
    let service: OrderMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [OrderMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(OrderMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrderMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderMySuffixService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
