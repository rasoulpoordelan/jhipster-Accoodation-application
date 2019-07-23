/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceServiceMySuffixComponent } from 'app/entities/place-service-my-suffix/place-service-my-suffix.component';
import { PlaceServiceMySuffixService } from 'app/entities/place-service-my-suffix/place-service-my-suffix.service';
import { PlaceServiceMySuffix } from 'app/shared/model/place-service-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaceServiceMySuffix Management Component', () => {
    let comp: PlaceServiceMySuffixComponent;
    let fixture: ComponentFixture<PlaceServiceMySuffixComponent>;
    let service: PlaceServiceMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceServiceMySuffixComponent],
        providers: []
      })
        .overrideTemplate(PlaceServiceMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaceServiceMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaceServiceMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PlaceServiceMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.placeServices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
