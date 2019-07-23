/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { PlaceCategoryMySuffixComponent } from 'app/entities/place-category-my-suffix/place-category-my-suffix.component';
import { PlaceCategoryMySuffixService } from 'app/entities/place-category-my-suffix/place-category-my-suffix.service';
import { PlaceCategoryMySuffix } from 'app/shared/model/place-category-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaceCategoryMySuffix Management Component', () => {
    let comp: PlaceCategoryMySuffixComponent;
    let fixture: ComponentFixture<PlaceCategoryMySuffixComponent>;
    let service: PlaceCategoryMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [PlaceCategoryMySuffixComponent],
        providers: []
      })
        .overrideTemplate(PlaceCategoryMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaceCategoryMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaceCategoryMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PlaceCategoryMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.placeCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
