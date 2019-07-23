/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceAreaMySuffixDeleteDialogComponent } from 'app/entities/place-area-my-suffix/place-area-my-suffix-delete-dialog.component';
import { PlaceAreaMySuffixService } from 'app/entities/place-area-my-suffix/place-area-my-suffix.service';

describe('Component Tests', () => {
  describe('PlaceAreaMySuffix Management Delete Component', () => {
    let comp: PlaceAreaMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<PlaceAreaMySuffixDeleteDialogComponent>;
    let service: PlaceAreaMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceAreaMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(PlaceAreaMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaceAreaMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaceAreaMySuffixService);
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
