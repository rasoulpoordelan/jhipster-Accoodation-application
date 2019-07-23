/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceCategoryMySuffixDeleteDialogComponent } from 'app/entities/place-category-my-suffix/place-category-my-suffix-delete-dialog.component';
import { PlaceCategoryMySuffixService } from 'app/entities/place-category-my-suffix/place-category-my-suffix.service';

describe('Component Tests', () => {
  describe('PlaceCategoryMySuffix Management Delete Component', () => {
    let comp: PlaceCategoryMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<PlaceCategoryMySuffixDeleteDialogComponent>;
    let service: PlaceCategoryMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceCategoryMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(PlaceCategoryMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaceCategoryMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaceCategoryMySuffixService);
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
