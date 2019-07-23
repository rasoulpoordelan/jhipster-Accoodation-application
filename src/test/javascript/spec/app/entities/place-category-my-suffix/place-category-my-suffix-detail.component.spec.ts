/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceCategoryMySuffixDetailComponent } from 'app/entities/place-category-my-suffix/place-category-my-suffix-detail.component';
import { PlaceCategoryMySuffix } from 'app/shared/model/place-category-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaceCategoryMySuffix Management Detail Component', () => {
    let comp: PlaceCategoryMySuffixDetailComponent;
    let fixture: ComponentFixture<PlaceCategoryMySuffixDetailComponent>;
    const route = ({ data: of({ placeCategory: new PlaceCategoryMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceCategoryMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlaceCategoryMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaceCategoryMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.placeCategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
