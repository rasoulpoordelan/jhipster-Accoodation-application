/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { OrderMySuffixComponent } from 'app/entities/order-my-suffix/order-my-suffix.component';
import { OrderMySuffixService } from 'app/entities/order-my-suffix/order-my-suffix.service';
import { OrderMySuffix } from 'app/shared/model/order-my-suffix.model';

describe('Component Tests', () => {
  describe('OrderMySuffix Management Component', () => {
    let comp: OrderMySuffixComponent;
    let fixture: ComponentFixture<OrderMySuffixComponent>;
    let service: OrderMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [OrderMySuffixComponent],
        providers: []
      })
        .overrideTemplate(OrderMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrderMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.orders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
