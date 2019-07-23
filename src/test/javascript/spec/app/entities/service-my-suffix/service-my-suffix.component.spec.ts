/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { ServiceMySuffixComponent } from 'app/entities/service-my-suffix/service-my-suffix.component';
import { ServiceMySuffixService } from 'app/entities/service-my-suffix/service-my-suffix.service';
import { ServiceMySuffix } from 'app/shared/model/service-my-suffix.model';

describe('Component Tests', () => {
  describe('ServiceMySuffix Management Component', () => {
    let comp: ServiceMySuffixComponent;
    let fixture: ComponentFixture<ServiceMySuffixComponent>;
    let service: ServiceMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [ServiceMySuffixComponent],
        providers: []
      })
        .overrideTemplate(ServiceMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ServiceMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.services[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
