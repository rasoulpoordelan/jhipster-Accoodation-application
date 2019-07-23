/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceServiceMySuffixDetailComponent } from 'app/entities/place-service-my-suffix/place-service-my-suffix-detail.component';
import { PlaceServiceMySuffix } from 'app/shared/model/place-service-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaceServiceMySuffix Management Detail Component', () => {
    let comp: PlaceServiceMySuffixDetailComponent;
    let fixture: ComponentFixture<PlaceServiceMySuffixDetailComponent>;
    const route = ({ data: of({ placeService: new PlaceServiceMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceServiceMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlaceServiceMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaceServiceMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.placeService).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
