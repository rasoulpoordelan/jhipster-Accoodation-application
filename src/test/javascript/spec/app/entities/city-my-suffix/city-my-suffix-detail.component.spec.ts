/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { CityMySuffixDetailComponent } from 'app/entities/city-my-suffix/city-my-suffix-detail.component';
import { CityMySuffix } from 'app/shared/model/city-my-suffix.model';

describe('Component Tests', () => {
  describe('CityMySuffix Management Detail Component', () => {
    let comp: CityMySuffixDetailComponent;
    let fixture: ComponentFixture<CityMySuffixDetailComponent>;
    const route = ({ data: of({ city: new CityMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [CityMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CityMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CityMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.city).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
