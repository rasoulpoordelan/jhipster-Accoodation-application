/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { CityMySuffixComponent } from 'app/entities/city-my-suffix/city-my-suffix.component';
import { CityMySuffixService } from 'app/entities/city-my-suffix/city-my-suffix.service';
import { CityMySuffix } from 'app/shared/model/city-my-suffix.model';

describe('Component Tests', () => {
  describe('CityMySuffix Management Component', () => {
    let comp: CityMySuffixComponent;
    let fixture: ComponentFixture<CityMySuffixComponent>;
    let service: CityMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [CityMySuffixComponent],
        providers: []
      })
        .overrideTemplate(CityMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CityMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CityMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CityMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
