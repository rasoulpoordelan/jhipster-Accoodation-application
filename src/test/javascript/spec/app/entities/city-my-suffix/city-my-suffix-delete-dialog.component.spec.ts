/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { CityMySuffixDeleteDialogComponent } from 'app/entities/city-my-suffix/city-my-suffix-delete-dialog.component';
import { CityMySuffixService } from 'app/entities/city-my-suffix/city-my-suffix.service';

describe('Component Tests', () => {
  describe('CityMySuffix Management Delete Component', () => {
    let comp: CityMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<CityMySuffixDeleteDialogComponent>;
    let service: CityMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [CityMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(CityMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CityMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CityMySuffixService);
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
