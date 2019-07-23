/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceTagMySuffixDetailComponent } from 'app/entities/place-tag-my-suffix/place-tag-my-suffix-detail.component';
import { PlaceTagMySuffix } from 'app/shared/model/place-tag-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaceTagMySuffix Management Detail Component', () => {
    let comp: PlaceTagMySuffixDetailComponent;
    let fixture: ComponentFixture<PlaceTagMySuffixDetailComponent>;
    const route = ({ data: of({ placeTag: new PlaceTagMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceTagMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlaceTagMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaceTagMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.placeTag).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
