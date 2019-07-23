/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterAccApplicationTestModule } from '../../../test.module';
import { TagMySuffixDetailComponent } from 'app/entities/tag-my-suffix/tag-my-suffix-detail.component';
import { TagMySuffix } from 'app/shared/model/tag-my-suffix.model';

describe('Component Tests', () => {
  describe('TagMySuffix Management Detail Component', () => {
    let comp: TagMySuffixDetailComponent;
    let fixture: ComponentFixture<TagMySuffixDetailComponent>;
    const route = ({ data: of({ tag: new TagMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAccApplicationTestModule],
        declarations: [TagMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TagMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TagMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tag).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
