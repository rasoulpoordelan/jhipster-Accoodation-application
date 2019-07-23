/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { OrderMySuffixUpdateComponent } from 'app/entities/order-my-suffix/order-my-suffix-update.component';
import { OrderMySuffixService } from 'app/entities/order-my-suffix/order-my-suffix.service';
import { OrderMySuffix } from 'app/shared/model/order-my-suffix.model';

describe('Component Tests', () => {
  describe('OrderMySuffix Management Update Component', () => {
    let comp: OrderMySuffixUpdateComponent;
    let fixture: ComponentFixture<OrderMySuffixUpdateComponent>;
    let service: OrderMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [OrderMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OrderMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrderMySuffix(123);
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
        const entity = new OrderMySuffix();
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
