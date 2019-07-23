/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { OrderMySuffixDetailComponent } from 'app/entities/order-my-suffix/order-my-suffix-detail.component';
import { OrderMySuffix } from 'app/shared/model/order-my-suffix.model';

describe('Component Tests', () => {
  describe('OrderMySuffix Management Detail Component', () => {
    let comp: OrderMySuffixDetailComponent;
    let fixture: ComponentFixture<OrderMySuffixDetailComponent>;
    const route = ({ data: of({ order: new OrderMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [OrderMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrderMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrderMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.order).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
