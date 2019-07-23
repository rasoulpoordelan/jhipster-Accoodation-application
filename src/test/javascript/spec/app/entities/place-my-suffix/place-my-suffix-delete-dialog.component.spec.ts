/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceMySuffixDeleteDialogComponent } from 'app/entities/place-my-suffix/place-my-suffix-delete-dialog.component';
import { PlaceMySuffixService } from 'app/entities/place-my-suffix/place-my-suffix.service';

describe('Component Tests', () => {
  describe('PlaceMySuffix Management Delete Component', () => {
    let comp: PlaceMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<PlaceMySuffixDeleteDialogComponent>;
    let service: PlaceMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(PlaceMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaceMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaceMySuffixService);
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
