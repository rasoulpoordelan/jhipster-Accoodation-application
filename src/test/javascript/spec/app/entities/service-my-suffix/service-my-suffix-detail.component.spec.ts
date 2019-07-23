/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { ServiceMySuffixDetailComponent } from 'app/entities/service-my-suffix/service-my-suffix-detail.component';
import { ServiceMySuffix } from 'app/shared/model/service-my-suffix.model';

describe('Component Tests', () => {
  describe('ServiceMySuffix Management Detail Component', () => {
    let comp: ServiceMySuffixDetailComponent;
    let fixture: ComponentFixture<ServiceMySuffixDetailComponent>;
    const route = ({ data: of({ service: new ServiceMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [ServiceMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ServiceMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ServiceMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.service).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
