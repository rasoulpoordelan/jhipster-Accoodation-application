/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { AttributeMySuffixComponent } from 'app/entities/attribute-my-suffix/attribute-my-suffix.component';
import { AttributeMySuffixService } from 'app/entities/attribute-my-suffix/attribute-my-suffix.service';
import { AttributeMySuffix } from 'app/shared/model/attribute-my-suffix.model';

describe('Component Tests', () => {
  describe('AttributeMySuffix Management Component', () => {
    let comp: AttributeMySuffixComponent;
    let fixture: ComponentFixture<AttributeMySuffixComponent>;
    let service: AttributeMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [AttributeMySuffixComponent],
        providers: []
      })
        .overrideTemplate(AttributeMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AttributeMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AttributeMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AttributeMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.attributes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
