/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceTypeMySuffixDetailComponent } from 'app/entities/place-type-my-suffix/place-type-my-suffix-detail.component';
import { PlaceTypeMySuffix } from 'app/shared/model/place-type-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaceTypeMySuffix Management Detail Component', () => {
    let comp: PlaceTypeMySuffixDetailComponent;
    let fixture: ComponentFixture<PlaceTypeMySuffixDetailComponent>;
    const route = ({ data: of({ placeType: new PlaceTypeMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceTypeMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlaceTypeMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaceTypeMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.placeType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
