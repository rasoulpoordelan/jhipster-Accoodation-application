/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceCategoryMySuffixUpdateComponent } from 'app/entities/place-category-my-suffix/place-category-my-suffix-update.component';
import { PlaceCategoryMySuffixService } from 'app/entities/place-category-my-suffix/place-category-my-suffix.service';
import { PlaceCategoryMySuffix } from 'app/shared/model/place-category-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaceCategoryMySuffix Management Update Component', () => {
    let comp: PlaceCategoryMySuffixUpdateComponent;
    let fixture: ComponentFixture<PlaceCategoryMySuffixUpdateComponent>;
    let service: PlaceCategoryMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceCategoryMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlaceCategoryMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaceCategoryMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaceCategoryMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlaceCategoryMySuffix(123);
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
        const entity = new PlaceCategoryMySuffix();
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
