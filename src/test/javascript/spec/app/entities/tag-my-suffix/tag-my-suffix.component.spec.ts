/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { TagMySuffixComponent } from 'app/entities/tag-my-suffix/tag-my-suffix.component';
import { TagMySuffixService } from 'app/entities/tag-my-suffix/tag-my-suffix.service';
import { TagMySuffix } from 'app/shared/model/tag-my-suffix.model';

describe('Component Tests', () => {
  describe('TagMySuffix Management Component', () => {
    let comp: TagMySuffixComponent;
    let fixture: ComponentFixture<TagMySuffixComponent>;
    let service: TagMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [TagMySuffixComponent],
        providers: []
      })
        .overrideTemplate(TagMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TagMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TagMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TagMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tags[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
