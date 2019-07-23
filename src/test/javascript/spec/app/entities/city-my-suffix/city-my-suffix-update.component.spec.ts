/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { CityMySuffixUpdateComponent } from 'app/entities/city-my-suffix/city-my-suffix-update.component';
import { CityMySuffixService } from 'app/entities/city-my-suffix/city-my-suffix.service';
import { CityMySuffix } from 'app/shared/model/city-my-suffix.model';

describe('Component Tests', () => {
  describe('CityMySuffix Management Update Component', () => {
    let comp: CityMySuffixUpdateComponent;
    let fixture: ComponentFixture<CityMySuffixUpdateComponent>;
    let service: CityMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [CityMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CityMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CityMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CityMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CityMySuffix(123);
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
        const entity = new CityMySuffix();
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
