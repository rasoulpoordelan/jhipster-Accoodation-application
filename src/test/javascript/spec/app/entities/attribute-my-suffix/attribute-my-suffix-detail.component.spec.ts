/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { AttributeMySuffixDetailComponent } from 'app/entities/attribute-my-suffix/attribute-my-suffix-detail.component';
import { AttributeMySuffix } from 'app/shared/model/attribute-my-suffix.model';

describe('Component Tests', () => {
  describe('AttributeMySuffix Management Detail Component', () => {
    let comp: AttributeMySuffixDetailComponent;
    let fixture: ComponentFixture<AttributeMySuffixDetailComponent>;
    const route = ({ data: of({ attribute: new AttributeMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [AttributeMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AttributeMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AttributeMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.attribute).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
