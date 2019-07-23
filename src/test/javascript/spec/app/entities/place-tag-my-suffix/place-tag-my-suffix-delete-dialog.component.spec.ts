/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceTagMySuffixDeleteDialogComponent } from 'app/entities/place-tag-my-suffix/place-tag-my-suffix-delete-dialog.component';
import { PlaceTagMySuffixService } from 'app/entities/place-tag-my-suffix/place-tag-my-suffix.service';

describe('Component Tests', () => {
  describe('PlaceTagMySuffix Management Delete Component', () => {
    let comp: PlaceTagMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<PlaceTagMySuffixDeleteDialogComponent>;
    let service: PlaceTagMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceTagMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(PlaceTagMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaceTagMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaceTagMySuffixService);
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
