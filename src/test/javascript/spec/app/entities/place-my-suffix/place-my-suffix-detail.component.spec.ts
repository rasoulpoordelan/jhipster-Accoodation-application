/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceMySuffixDetailComponent } from 'app/entities/place-my-suffix/place-my-suffix-detail.component';
import { PlaceMySuffix } from 'app/shared/model/place-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaceMySuffix Management Detail Component', () => {
    let comp: PlaceMySuffixDetailComponent;
    let fixture: ComponentFixture<PlaceMySuffixDetailComponent>;
    const route = ({ data: of({ place: new PlaceMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlaceMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaceMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.place).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
