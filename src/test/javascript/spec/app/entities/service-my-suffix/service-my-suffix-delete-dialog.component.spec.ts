/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { ServiceMySuffixDeleteDialogComponent } from 'app/entities/service-my-suffix/service-my-suffix-delete-dialog.component';
import { ServiceMySuffixService } from 'app/entities/service-my-suffix/service-my-suffix.service';

describe('Component Tests', () => {
  describe('ServiceMySuffix Management Delete Component', () => {
    let comp: ServiceMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<ServiceMySuffixDeleteDialogComponent>;
    let service: ServiceMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [ServiceMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(ServiceMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ServiceMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceMySuffixService);
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
