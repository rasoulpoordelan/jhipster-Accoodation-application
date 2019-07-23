/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { AttributeMySuffixDeleteDialogComponent } from 'app/entities/attribute-my-suffix/attribute-my-suffix-delete-dialog.component';
import { AttributeMySuffixService } from 'app/entities/attribute-my-suffix/attribute-my-suffix.service';

describe('Component Tests', () => {
  describe('AttributeMySuffix Management Delete Component', () => {
    let comp: AttributeMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<AttributeMySuffixDeleteDialogComponent>;
    let service: AttributeMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [AttributeMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(AttributeMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AttributeMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AttributeMySuffixService);
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
