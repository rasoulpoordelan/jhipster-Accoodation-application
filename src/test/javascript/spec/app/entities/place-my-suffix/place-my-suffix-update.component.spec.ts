/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceMySuffixUpdateComponent } from 'app/entities/place-my-suffix/place-my-suffix-update.component';
import { PlaceMySuffixService } from 'app/entities/place-my-suffix/place-my-suffix.service';
import { PlaceMySuffix } from 'app/shared/model/place-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaceMySuffix Management Update Component', () => {
    let comp: PlaceMySuffixUpdateComponent;
    let fixture: ComponentFixture<PlaceMySuffixUpdateComponent>;
    let service: PlaceMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlaceMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaceMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaceMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlaceMySuffix(123);
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
        const entity = new PlaceMySuffix();
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
