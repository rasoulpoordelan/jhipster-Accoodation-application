/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceTagMySuffixUpdateComponent } from 'app/entities/place-tag-my-suffix/place-tag-my-suffix-update.component';
import { PlaceTagMySuffixService } from 'app/entities/place-tag-my-suffix/place-tag-my-suffix.service';
import { PlaceTagMySuffix } from 'app/shared/model/place-tag-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaceTagMySuffix Management Update Component', () => {
    let comp: PlaceTagMySuffixUpdateComponent;
    let fixture: ComponentFixture<PlaceTagMySuffixUpdateComponent>;
    let service: PlaceTagMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceTagMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlaceTagMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaceTagMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaceTagMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlaceTagMySuffix(123);
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
        const entity = new PlaceTagMySuffix();
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
