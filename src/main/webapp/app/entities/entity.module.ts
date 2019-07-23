import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'city-my-suffix',
        loadChildren: './city-my-suffix/city-my-suffix.module#JhipsterAccApplicationCityMySuffixModule'
      },
      {
        path: 'place-category-my-suffix',
        loadChildren: './place-category-my-suffix/place-category-my-suffix.module#JhipsterAccApplicationPlaceCategoryMySuffixModule'
      },
      {
        path: 'place-area-my-suffix',
        loadChildren: './place-area-my-suffix/place-area-my-suffix.module#JhipsterAccApplicationPlaceAreaMySuffixModule'
      },
      {
        path: 'place-my-suffix',
        loadChildren: './place-my-suffix/place-my-suffix.module#JhipsterAccApplicationPlaceMySuffixModule'
      },
      {
        path: 'place-type-my-suffix',
        loadChildren: './place-type-my-suffix/place-type-my-suffix.module#JhipsterAccApplicationPlaceTypeMySuffixModule'
      },
      {
        path: 'service-my-suffix',
        loadChildren: './service-my-suffix/service-my-suffix.module#JhipsterAccApplicationServiceMySuffixModule'
      },
      {
        path: 'place-service-my-suffix',
        loadChildren: './place-service-my-suffix/place-service-my-suffix.module#JhipsterAccApplicationPlaceServiceMySuffixModule'
      },
      {
        path: 'attribute-my-suffix',
        loadChildren: './attribute-my-suffix/attribute-my-suffix.module#JhipsterAccApplicationAttributeMySuffixModule'
      },
      {
        path: 'tag-my-suffix',
        loadChildren: './tag-my-suffix/tag-my-suffix.module#JhipsterAccApplicationTagMySuffixModule'
      },
      {
        path: 'place-tag-my-suffix',
        loadChildren: './place-tag-my-suffix/place-tag-my-suffix.module#JhipsterAccApplicationPlaceTagMySuffixModule'
      },
      {
        path: 'order-my-suffix',
        loadChildren: './order-my-suffix/order-my-suffix.module#JhipsterAccApplicationOrderMySuffixModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAccApplicationEntityModule {}
