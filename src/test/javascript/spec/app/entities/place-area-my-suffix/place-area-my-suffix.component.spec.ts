/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceAreaMySuffixComponent } from 'app/entities/place-area-my-suffix/place-area-my-suffix.component';
import { PlaceAreaMySuffixService } from 'app/entities/place-area-my-suffix/place-area-my-suffix.service';
import { PlaceAreaMySuffix } from 'app/shared/model/place-area-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaceAreaMySuffix Management Component', () => {
    let comp: PlaceAreaMySuffixComponent;
    let fixture: ComponentFixture<PlaceAreaMySuffixComponent>;
    let service: PlaceAreaMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceAreaMySuffixComponent],
        providers: []
      })
        .overrideTemplate(PlaceAreaMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaceAreaMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaceAreaMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PlaceAreaMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.placeAreas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
