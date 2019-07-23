/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceTypeMySuffixComponent } from 'app/entities/place-type-my-suffix/place-type-my-suffix.component';
import { PlaceTypeMySuffixService } from 'app/entities/place-type-my-suffix/place-type-my-suffix.service';
import { PlaceTypeMySuffix } from 'app/shared/model/place-type-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaceTypeMySuffix Management Component', () => {
    let comp: PlaceTypeMySuffixComponent;
    let fixture: ComponentFixture<PlaceTypeMySuffixComponent>;
    let service: PlaceTypeMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceTypeMySuffixComponent],
        providers: []
      })
        .overrideTemplate(PlaceTypeMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaceTypeMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaceTypeMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PlaceTypeMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.placeTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
