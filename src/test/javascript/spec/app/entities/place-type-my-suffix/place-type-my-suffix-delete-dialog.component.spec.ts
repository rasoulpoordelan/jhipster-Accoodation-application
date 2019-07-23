/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceTypeMySuffixDeleteDialogComponent } from 'app/entities/place-type-my-suffix/place-type-my-suffix-delete-dialog.component';
import { PlaceTypeMySuffixService } from 'app/entities/place-type-my-suffix/place-type-my-suffix.service';

describe('Component Tests', () => {
  describe('PlaceTypeMySuffix Management Delete Component', () => {
    let comp: PlaceTypeMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<PlaceTypeMySuffixDeleteDialogComponent>;
    let service: PlaceTypeMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceTypeMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(PlaceTypeMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaceTypeMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaceTypeMySuffixService);
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
