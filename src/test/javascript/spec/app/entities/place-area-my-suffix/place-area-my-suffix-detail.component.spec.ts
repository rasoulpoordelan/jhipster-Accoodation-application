/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceAreaMySuffixDetailComponent } from 'app/entities/place-area-my-suffix/place-area-my-suffix-detail.component';
import { PlaceAreaMySuffix } from 'app/shared/model/place-area-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaceAreaMySuffix Management Detail Component', () => {
    let comp: PlaceAreaMySuffixDetailComponent;
    let fixture: ComponentFixture<PlaceAreaMySuffixDetailComponent>;
    const route = ({ data: of({ placeArea: new PlaceAreaMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceAreaMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlaceAreaMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaceAreaMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.placeArea).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
