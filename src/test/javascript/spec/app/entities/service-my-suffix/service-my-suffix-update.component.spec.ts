/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { ServiceMySuffixUpdateComponent } from 'app/entities/service-my-suffix/service-my-suffix-update.component';
import { ServiceMySuffixService } from 'app/entities/service-my-suffix/service-my-suffix.service';
import { ServiceMySuffix } from 'app/shared/model/service-my-suffix.model';

describe('Component Tests', () => {
  describe('ServiceMySuffix Management Update Component', () => {
    let comp: ServiceMySuffixUpdateComponent;
    let fixture: ComponentFixture<ServiceMySuffixUpdateComponent>;
    let service: ServiceMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [ServiceMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ServiceMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ServiceMySuffix(123);
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
        const entity = new ServiceMySuffix();
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
