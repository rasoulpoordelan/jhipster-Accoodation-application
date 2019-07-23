/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceServiceMySuffixUpdateComponent } from 'app/entities/place-service-my-suffix/place-service-my-suffix-update.component';
import { PlaceServiceMySuffixService } from 'app/entities/place-service-my-suffix/place-service-my-suffix.service';
import { PlaceServiceMySuffix } from 'app/shared/model/place-service-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaceServiceMySuffix Management Update Component', () => {
    let comp: PlaceServiceMySuffixUpdateComponent;
    let fixture: ComponentFixture<PlaceServiceMySuffixUpdateComponent>;
    let service: PlaceServiceMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceServiceMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlaceServiceMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaceServiceMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaceServiceMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlaceServiceMySuffix(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlaceServiceMySuffix();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
