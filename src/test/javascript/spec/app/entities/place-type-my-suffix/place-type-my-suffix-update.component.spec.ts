/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceTypeMySuffixUpdateComponent } from 'app/entities/place-type-my-suffix/place-type-my-suffix-update.component';
import { PlaceTypeMySuffixService } from 'app/entities/place-type-my-suffix/place-type-my-suffix.service';
import { PlaceTypeMySuffix } from 'app/shared/model/place-type-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaceTypeMySuffix Management Update Component', () => {
    let comp: PlaceTypeMySuffixUpdateComponent;
    let fixture: ComponentFixture<PlaceTypeMySuffixUpdateComponent>;
    let service: PlaceTypeMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceTypeMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlaceTypeMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaceTypeMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaceTypeMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlaceTypeMySuffix(123);
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
        const entity = new PlaceTypeMySuffix();
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
