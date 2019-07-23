/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceAreaMySuffixUpdateComponent } from 'app/entities/place-area-my-suffix/place-area-my-suffix-update.component';
import { PlaceAreaMySuffixService } from 'app/entities/place-area-my-suffix/place-area-my-suffix.service';
import { PlaceAreaMySuffix } from 'app/shared/model/place-area-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaceAreaMySuffix Management Update Component', () => {
    let comp: PlaceAreaMySuffixUpdateComponent;
    let fixture: ComponentFixture<PlaceAreaMySuffixUpdateComponent>;
    let service: PlaceAreaMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceAreaMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlaceAreaMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaceAreaMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaceAreaMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlaceAreaMySuffix(123);
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
        const entity = new PlaceAreaMySuffix();
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
