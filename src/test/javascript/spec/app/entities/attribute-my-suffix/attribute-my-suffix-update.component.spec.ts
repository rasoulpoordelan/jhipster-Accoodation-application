/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { AttributeMySuffixUpdateComponent } from 'app/entities/attribute-my-suffix/attribute-my-suffix-update.component';
import { AttributeMySuffixService } from 'app/entities/attribute-my-suffix/attribute-my-suffix.service';
import { AttributeMySuffix } from 'app/shared/model/attribute-my-suffix.model';

describe('Component Tests', () => {
  describe('AttributeMySuffix Management Update Component', () => {
    let comp: AttributeMySuffixUpdateComponent;
    let fixture: ComponentFixture<AttributeMySuffixUpdateComponent>;
    let service: AttributeMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [AttributeMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AttributeMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AttributeMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AttributeMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AttributeMySuffix(123);
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
        const entity = new AttributeMySuffix();
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
